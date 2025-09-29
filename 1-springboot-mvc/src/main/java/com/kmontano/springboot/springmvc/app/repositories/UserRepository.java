package com.kmontano.springboot.springmvc.app.repositories;

import com.kmontano.springboot.springmvc.app.entities.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

}
