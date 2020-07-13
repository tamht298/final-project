package com.thanhtam.backend.ultilities;

public enum ERole {
    ROLE_ADMIN("ROLE_ADMIN"), ROLE_LECTURER("ROLE_LECTURER"), ROLE_STUDENT("ROLE_STUDENT");

    private final String type;

    private ERole(String type) {
        this.type = type;
    }

    public String toString() {
        return this.type;
    }
    }
