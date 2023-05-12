package com.eblj.dsmeta.rest.services.impl;

import com.eblj.dsmeta.entities.Sale;
import com.eblj.dsmeta.repositores.SaleRepository;
import com.eblj.dsmeta.rest.SmsService;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsServiceImpl implements SmsService {

    @Value("${twilio.sid}")
    private String twilioSid;

    @Value("${twilio.key}")
    private String twilioKey;

    @Value("${twilio.phone.from}")
    private String twilioPhoneFrom;

    @Value("${twilio.phone.to}")
    private String twilioPhoneTo;

    @Autowired
    private SaleRepository repository;

    public void sendSms(Long saleId) {

        Sale sale= repository.findById(saleId).get();

        String date= sale.getDate().getMonthValue()+"/"+sale.getDate().getYear();
        String msg = "O Vendedor "+sale.getSellerName() +" foi destaque em " +date
                + " com um total de R$ "+ String.format("%.2f", sale.getAmount());

        Twilio.init(twilioSid, twilioKey);
        PhoneNumber to = new PhoneNumber(twilioPhoneTo);
        PhoneNumber from = new PhoneNumber(twilioPhoneFrom);
        Message message = Message.creator(to, from, msg).create();
        System.out.println("Mensagem enviada :"+message.getSid());

    }
}