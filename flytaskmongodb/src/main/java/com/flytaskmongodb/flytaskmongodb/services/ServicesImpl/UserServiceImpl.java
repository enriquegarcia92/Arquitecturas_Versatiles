package com.flytaskmongodb.flytaskmongodb.services.ServicesImpl;

import com.flytaskmongodb.flytaskmongodb.model.User;
import com.flytaskmongodb.flytaskmongodb.repository.UserRepository;
import com.flytaskmongodb.flytaskmongodb.services.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User getUserbyId(ObjectId userId) {
        User usertoGet = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        return usertoGet;
    }
}
