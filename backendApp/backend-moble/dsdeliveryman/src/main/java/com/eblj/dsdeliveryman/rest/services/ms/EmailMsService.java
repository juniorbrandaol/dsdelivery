package com.eblj.dsdeliveryman.rest.services.ms;

import com.eblj.dsdeliveryman.dto.ms.CodeDTO;
import com.eblj.dsdeliveryman.dto.ms.EmailDTO;

public interface EmailMsService {
        void sendEmail(EmailDTO dto);
        CodeDTO sendEmailConfirmation(EmailDTO dto);
}
