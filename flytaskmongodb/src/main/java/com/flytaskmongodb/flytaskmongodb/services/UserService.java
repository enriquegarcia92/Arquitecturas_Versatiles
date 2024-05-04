package com.flytaskmongodb.flytaskmongodb.services;


import com.flytaskmongodb.flytaskmongodb.model.User;

public interface UserService {
    public User getUserbyId(Integer userId);
}
