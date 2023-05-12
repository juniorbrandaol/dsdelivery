package com.eblj.dsmeta.util;

import org.apache.commons.lang.RandomStringUtils;

import java.util.Random;

public class GenerateCod {

    public static String generateToken(int len) {
        String chars = "0123456789";
        Random rnd = new Random();
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++)
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        return sb.toString();
    }
    public String generateCode() {
        int length = 7;
        boolean useLetters = true;
        boolean useNumbers = true;
        String generated = RandomStringUtils.random(length, useLetters, useNumbers);
        return generated.toUpperCase().trim();

    }

    public  String codePayment() {
        int length = 7;
        boolean useLetters = false;
        boolean useNumbers = true;
        return RandomStringUtils.random(length, useLetters, useNumbers);

    }
}
