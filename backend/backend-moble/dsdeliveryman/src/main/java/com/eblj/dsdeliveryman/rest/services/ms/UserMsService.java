package com.eblj.dsdeliveryman.rest.services.ms;

import com.eblj.dsdeliveryman.dto.ms.UserMsDTO;

public interface UserMsService {
    UserMsDTO findById(Long id);
}
