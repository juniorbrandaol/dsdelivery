package com.eblju.dsdelivery.rest.services.impl.fc;

import com.eblju.dsdelivery.dto.fc.SmsDTO;
import com.eblju.dsdelivery.feignClient.SmsFeignClient;
import com.eblju.dsdelivery.rest.services.fc.SmsMsService;
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
