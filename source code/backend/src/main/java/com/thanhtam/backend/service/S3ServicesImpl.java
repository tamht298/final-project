package com.thanhtam.backend.service;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class S3ServicesImpl implements S3Services {
    private Logger logger = LoggerFactory.getLogger(S3ServicesImpl.class);

    private AmazonS3 s3client;

    @Autowired
    public S3ServicesImpl(AmazonS3 s3client) {
        this.s3client = s3client;
    }

    @Value("${isc.s3.bucket}")
    private String bucketName;

    @Override
    public ByteArrayOutputStream downloadS3File(String keyName) {
        try {
            S3Object s3object = s3client.getObject(new GetObjectRequest(bucketName, keyName));

            InputStream is = s3object.getObjectContent();
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            int len;
            byte[] buffer = new byte[4096];
            while ((len = is.read(buffer, 0, buffer.length)) != -1) {
                baos.write(buffer, 0, len);
            }

            return baos;
        } catch (IOException ioe) {
            logger.error("IOException: " + ioe.getMessage());
        } catch (AmazonServiceException ase) {
            logger.info("sCaught an AmazonServiceException from GET requests, rejected reasons:");
            logger.info("Error Message:    " + ase.getMessage());
            logger.info("HTTP Status Code: " + ase.getStatusCode());
            logger.info("AWS Error Code:   " + ase.getErrorCode());
            logger.info("Error Type:       " + ase.getErrorType());
            logger.info("Request ID:       " + ase.getRequestId());
            throw ase;
        } catch (AmazonClientException ace) {
            logger.info("Caught an AmazonClientException: ");
            logger.info("Error Message: " + ace.getMessage());
            throw ace;
        }

        return null;
    }

    @Override
    public void uploadS3File(String keyName, MultipartFile file) {
        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            s3client.putObject( new PutObjectRequest(bucketName, keyName, file.getInputStream(), metadata).withCannedAcl(CannedAccessControlList.PublicRead));
        } catch(IOException ioe) {
            logger.error("IOException: " + ioe.getMessage());
        } catch (AmazonServiceException ase) {
            logger.info("Caught an AmazonServiceException from PUT requests, rejected reasons:");
            logger.info("Error Message:    " + ase.getMessage());
            logger.info("HTTP Status Code: " + ase.getStatusCode());
            logger.info("AWS Error Code:   " + ase.getErrorCode());
            logger.info("Error Type:       " + ase.getErrorType());
            logger.info("Request ID:       " + ase.getRequestId());
            throw ase;
        } catch (AmazonClientException ace) {
            logger.info("Caught an AmazonClientException: ");
            logger.info("Error Message: " + ace.getMessage());
            throw ace;
        }
    }

    public void deleteFile(String keyName) {
        logger.info("Deleting file with name= " + keyName);
        final DeleteObjectRequest deleteObjectRequest = new DeleteObjectRequest(bucketName, keyName);
        s3client.deleteObject(deleteObjectRequest);
        logger.info("File deleted successfully.");
    }

    public List<String> listS3Files() {

        ListObjectsRequest listObjectsRequest =
                new ListObjectsRequest()
                        .withBucketName(bucketName);
        //.withPrefix("test" + "/");

        List<String> keys = new ArrayList<>();

        ObjectListing objects = s3client.listObjects(listObjectsRequest);

        while (true) {
            List<S3ObjectSummary> summaries = objects.getObjectSummaries();
            if (summaries.size() < 1) {
                break;
            }

            for (S3ObjectSummary item : summaries) {
                if (!item.getKey().endsWith("/"))
                    keys.add(item.getKey());
            }

            objects = s3client.listNextBatchOfObjects(objects);
        }

        return keys;
    }
}
