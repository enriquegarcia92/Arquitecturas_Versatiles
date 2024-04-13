package com.flytask.flytask.Services.ServiceImpl;

import com.flytask.flytask.Services.UserService;
import com.flytask.flytask.model.User;
import com.flytask.flytask.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User getUserbyId(Integer userId) {
        User usertoGet = userRepository.getReferenceById(userId);
        return usertoGet;
    }
}
