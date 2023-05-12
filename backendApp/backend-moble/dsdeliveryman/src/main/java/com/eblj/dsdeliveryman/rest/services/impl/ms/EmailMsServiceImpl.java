package com.eblj.dsdeliveryman.rest.services.impl.ms;

import com.eblj.dsdeliveryman.dto.ms.CodeDTO;
import com.eblj.dsdeliveryman.dto.ms.EmailDTO;
import com.eblj.dsdeliveryman.feignEntities.EmailFeignClient;
import com.eblj.dsdeliveryman.rest.services.ms.EmailMsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class EmailMsServiceImpl implements EmailMsService {

    @Autowired
    private EmailFeignClient emailFeignClient;
    @Override
    public void sendEmail(EmailDTO dto) {
        emailFeignClient.sendEmail(dto);
    }

    @Override
    public CodeDTO sendEmailConfirmation(EmailDTO dto) {return emailFeignClient.sendEmailConfirmation(dto);}
}
