package com.flytaskmongodb.flytaskmongodb.services;


import com.flytaskmongodb.flytaskmongodb.model.User;
import org.bson.types.ObjectId;

public interface UserService {
    public User getUserbyId(ObjectId userId);
}
