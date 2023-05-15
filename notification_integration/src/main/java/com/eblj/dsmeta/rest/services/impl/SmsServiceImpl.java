package com.eblj.dsmeta.rest.services.impl;

import com.eblj.dsmeta.dto.SmsDTO;
import com.eblj.dsmeta.rest.SmsService;
import com.eblj.dsmeta.util.GenerateCod;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

@Service
public class SmsServiceImpl implements SmsService {

    @Value("${twilio.sid}")
    private String twilioSid;

    @Value("${twilio.key}")
    private String twilioKey;

    @Value("${twilio.phone.from}")
    private String twilioPhoneFrom;

   // @Value("${twilio.phone.to}")
   // private String twilioPhoneTo;

    @Override
    public void sendSms(SmsDTO dto) {

        String token = GenerateCod.generateToken(4);
        LocalDateTime today = LocalDateTime.now();
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm").withZone(ZoneId.systemDefault());

        String msg = "O seu código de verificação para DSDelivery é: "+token
                + "\n"+today.format(format);
        Twilio.init(twilioSid, twilioKey);
        PhoneNumber to = new PhoneNumber(dto.getTo());
        PhoneNumber from = new PhoneNumber(twilioPhoneFrom);
        Message message = Message.creator(to, from, msg).setMediaUrl(
                Arrays.asList(URI.create("https://raw.githubusercontent.com/devsuperior/sds2/master/assets/pizza_bacon.jpg"))).create();

        System.out.println("Mensagem enviada :"+message.getSid());

    }

}