package com.eblj.dsdeliveryman.rest.services.ms;

import com.eblj.dsdeliveryman.dto.ms.UserDto;

public interface UserMsService {
    UserDto findById(Long id);
}
