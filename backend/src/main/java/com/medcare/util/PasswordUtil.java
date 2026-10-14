package com.medcare.util;

import java.security.MessageDigest;
import java.security.GeneralSecurityException;
import java.security.SecureRandom;
import java.util.Base64;
import java.nio.charset.StandardCharsets;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

/**
 * Password hashing and verification utility.
 */
public class PasswordUtil {
    private static final int ITERATIONS = 210_000;
    private static final int KEY_LENGTH_BITS = 256;
    private static final int SALT_LENGTH_BYTES = 16;
    private static final int MIN_ACCEPTED_ITERATIONS = 100_000;
    private static final int MAX_ACCEPTED_ITERATIONS = 1_000_000;
    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    public static String hashPassword(String password) {
        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Password must not be empty.");
        }

        try {
            byte[] salt = new byte[SALT_LENGTH_BYTES];
            SECURE_RANDOM.nextBytes(salt);
            byte[] derivedKey = deriveKey(password, salt, ITERATIONS);
            return "$pbkdf2-sha256$" + ITERATIONS + "$"
                    + Base64.getEncoder().encodeToString(salt) + "$"
                    + Base64.getEncoder().encodeToString(derivedKey);
        } catch (GeneralSecurityException e) {
            throw new IllegalStateException("PBKDF2-HMAC-SHA256 is unavailable.", e);
        }
    }

    public static boolean verifyPassword(String inputPassword, String storedHash) {
        if (inputPassword == null || storedHash == null) {
            return false;
        }

        if (storedHash.startsWith("$pbkdf2-sha256$")) {
            return verifyPbkdf2(inputPassword, storedHash);
        }

        // Read legacy SHA-256 hashes so existing accounts remain usable until their
        // passwords are changed; new hashes always use PBKDF2.
        if (storedHash.startsWith("$")) {
            return false;
        }

        try {
            String[] parts = storedHash.split(":", -1);
            if (parts.length != 2) return false;

            byte[] salt = Base64.getDecoder().decode(parts[0]);
            byte[] expectedHash = Base64.getDecoder().decode(parts[1]);

            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(salt);
            byte[] actualHash = md.digest(inputPassword.getBytes(StandardCharsets.UTF_8));

            return MessageDigest.isEqual(expectedHash, actualHash);
        } catch (IllegalArgumentException | GeneralSecurityException e) {
            return false;
        }
    }

    private static boolean verifyPbkdf2(String inputPassword, String storedHash) {
        try {
            String[] parts = storedHash.split("\\$", -1);
            if (parts.length != 5 || !"pbkdf2-sha256".equals(parts[1])) {
                return false;
            }

            int iterations = Integer.parseInt(parts[2]);
            byte[] salt = Base64.getDecoder().decode(parts[3]);
            byte[] expectedKey = Base64.getDecoder().decode(parts[4]);
            if (iterations < MIN_ACCEPTED_ITERATIONS || iterations > MAX_ACCEPTED_ITERATIONS ||
                    salt.length < SALT_LENGTH_BYTES || expectedKey.length != KEY_LENGTH_BITS / 8) {
                return false;
            }

            byte[] actualKey = deriveKey(inputPassword, salt, iterations);
            return MessageDigest.isEqual(expectedKey, actualKey);
        } catch (IllegalArgumentException | GeneralSecurityException e) {
            return false;
        }
    }

    private static byte[] deriveKey(String password, byte[] salt, int iterations)
            throws GeneralSecurityException {
        PBEKeySpec spec = new PBEKeySpec(password.toCharArray(), salt, iterations, KEY_LENGTH_BITS);
        try {
            return SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256")
                    .generateSecret(spec)
                    .getEncoded();
        } finally {
            spec.clearPassword();
        }
    }
}
