package com.kmontano.springboot.springmvc.app.services;

import com.kmontano.springboot.springmvc.app.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> findAll();
    Optional<User> findBy(Long id);
    User save(User user);
    void delete(Long id);
}
