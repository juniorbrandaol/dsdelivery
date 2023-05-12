package com.eblj.email_integration.services;

import com.eblj.email_integration.dto.CodeDTO;
import com.eblj.email_integration.dto.EmailDTO;

public interface EmailService {
    void sendEmail(EmailDTO dto);

    CodeDTO sendEmailConfirmation(EmailDTO dto);
}
