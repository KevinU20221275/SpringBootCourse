package org.kmontano.springboot.backend.chat.app.repositories;

import org.kmontano.springboot.backend.chat.app.models.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findFirst10ByOrderByDateAsc();
}
