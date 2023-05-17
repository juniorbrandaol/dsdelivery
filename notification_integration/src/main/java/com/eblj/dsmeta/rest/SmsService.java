package com.eblj.dsmeta.rest;

import com.eblj.dsmeta.dto.SmsDTO;

public interface SmsService {
    SmsDTO sendSms(SmsDTO dto);
}