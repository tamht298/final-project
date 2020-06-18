package com.thanhtam.backend.ultilities;

public enum EQTypeCode {
    /**
     * TF: true/false
     * MC: Multiple choice
     * MS: Multiple select
     */

    TF("TF"), MC("MC"), MS("MS");
    private final String type;

    private EQTypeCode(String type) {
        this.type = type;
    }

    public String toString() {
        return this.type;
    }


}
