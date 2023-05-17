package com.eblju.dsdelivery.dto.fc;

public class SmsDTO {
    private String to;
    private String token;

    public SmsDTO() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }
}