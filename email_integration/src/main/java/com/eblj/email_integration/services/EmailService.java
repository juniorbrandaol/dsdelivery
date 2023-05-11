package com.eblj.email_integration.services;

import com.eblj.email_integration.dto.EmailDTO;

public interface EmailService {
    void sendEmail(EmailDTO dto);
}
