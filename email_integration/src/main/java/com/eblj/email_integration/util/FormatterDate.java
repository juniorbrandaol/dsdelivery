package com.eblj.email_integration.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class FormatterDate {

    public String formatterDate(){
        LocalDateTime date = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        String formatted = date.format(formatter);
        return formatted;
    }
}
