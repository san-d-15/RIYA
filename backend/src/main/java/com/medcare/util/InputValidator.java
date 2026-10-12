package com.medcare.util;

import java.util.regex.Pattern;

/**
 * Validation utilities for form submissions and anti-injection defense
 */
public class InputValidator {
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");
    private static final Pattern PHONE_PATTERN = Pattern.compile("^[+0-9\\s-]{8,20}$");

    public static boolean isValidEmail(String email) {
        return email != null && EMAIL_PATTERN.matcher(email.trim()).matches();
    }

    public static boolean isValidPhone(String phone) {
        return phone != null && PHONE_PATTERN.matcher(phone.trim()).matches();
    }

    public static boolean isNonEmpty(String str) {
        return str != null && !str.trim().isEmpty();
    }

    public static boolean isPositive(double value) {
        return value >= 0.0;
    }

    public static boolean isPositive(int value) {
        return value >= 0;
    }
}
