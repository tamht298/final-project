package com.thanhtam.backend.config;

import com.thanhtam.backend.service.UserDetailsImpl;
import com.thanhtam.backend.ultilities.Constants;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    public String generateJwtToken(Authentication authentication) {

        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + Constants.ACCESS_TOKEN_VALIDITY_SECONDS * 1000))
                .claim("role", userPrincipal.getAuthorities())
                .signWith(SignatureAlgorithm.HS512, Constants.SIGNING_KEY)
                .compact();
    }

    public String generateEmailVerificationToken(Long userId) {
        String token = Jwts.builder()
                .setSubject(String.valueOf(userId))
                .setExpiration(new Date((new Date()).getTime() + Constants.ACCESS_TOKEN_VALIDITY_SECONDS * 1000))
                .signWith(SignatureAlgorithm.HS512, Constants.SIGNING_KEY)
                .compact();
        return token;
    }

    public String generatePasswordResetToken(Long userId) {
        String token = Jwts.builder()
                .setSubject(String.valueOf(userId))
                .setExpiration(new Date((new Date()).getTime() + Constants.ACCESS_TOKEN_VALIDITY_SECONDS * 1000))
                .signWith(SignatureAlgorithm.HS512, Constants.SIGNING_KEY)
                .compact();
        return token;
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(Constants.SIGNING_KEY).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean hasTokenExpired(String token) {
        Claims claims= Jwts.parser().setSigningKey(Constants.SIGNING_KEY).parseClaimsJws(token).getBody();
        Date tokenExpirationDate = claims.getExpiration();
        Date today = new Date();
        return tokenExpirationDate.before(today);
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(Constants.SIGNING_KEY).parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException ex) {

            logger.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            logger.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string is empty.");
        }
        return false;
    }
}
