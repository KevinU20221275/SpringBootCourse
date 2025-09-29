package org.kmontano.springboot.backend.chat.app.services;

import org.kmontano.springboot.backend.chat.app.models.Message;
import org.kmontano.springboot.backend.chat.app.repositories.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceMongo implements MessageService {
    private final MessageRepository repository;

    public MessageServiceMongo(MessageRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Message> findAll() {
        return repository.findFirst10ByOrderByDateAsc();
    }

    @Override
    public void save(Message message) {
        repository.save(message);
    }
}
