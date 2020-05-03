package com.thanhtam.backend.ultilities;

public enum DifficultyLevel {
    EASY(1), MEDIUM(2), HARD(3);

    int level;

    DifficultyLevel(int level) {
        this.level = level;
    }

    public static DifficultyLevel getLevelByValue(int value) {
        for (DifficultyLevel lv : DifficultyLevel.values()
        ) {
            if (lv.level == value) return lv;
        }
        return null;
    }
}
