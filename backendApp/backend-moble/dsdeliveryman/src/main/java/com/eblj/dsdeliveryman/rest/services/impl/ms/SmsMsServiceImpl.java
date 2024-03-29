package com.eblj.dsdeliveryman.rest.services.impl.ms;

import com.eblj.dsdeliveryman.dto.ms.SmsDTO;
import com.eblj.dsdeliveryman.feignClient.SmsFeignClient;
import com.eblj.dsdeliveryman.rest.services.ms.SmsMsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class SmsMsServiceImpl implements SmsMsService {

    @Autowired
    private SmsFeignClient smsFeignClient;
    @Override
    public SmsDTO sendSms(SmsDTO dto) {
            return smsFeignClient.sendSms(dto);
    }

}
