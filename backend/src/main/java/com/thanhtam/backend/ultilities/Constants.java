package com.thanhtam.backend.ultilities;

public class Constants {

    public static final long ACCESS_TOKEN_VALIDITY_SECONDS = 60 * 60 * 24;
    public static final long PASSWORD_RESET_EXPIRATION_TIME = 60 * 60 * 24;
    public static final String SIGNING_KEY = "thanhtam";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String AUTHORITIES_KEY = "scopes";
}
