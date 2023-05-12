package com.eblj.dsdeliveryman.rest.services.impl.ms;

import com.eblj.dsdeliveryman.dto.ms.UserDto;
import com.eblj.dsdeliveryman.feignEntities.UserFeignClient;
import com.eblj.dsdeliveryman.rest.services.exceptions.ResourceNotFoundException;
import com.eblj.dsdeliveryman.rest.services.ms.UserMsService;
import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserMsServiceImpl implements UserMsService {

    @Autowired
    private UserFeignClient userFeignClient;
    @Override
    @Transactional(readOnly = true)
    public UserDto findById(Long id) {
        try {
         return userFeignClient.findById(id);
        }catch (FeignException.FeignClientException e){
            throw  new ResourceNotFoundException(e.getMessage());
        }
    }
}
