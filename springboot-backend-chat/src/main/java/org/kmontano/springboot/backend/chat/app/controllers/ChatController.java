package org.kmontano.springboot.backend.chat.app.controllers;

import org.kmontano.springboot.backend.chat.app.models.Message;
import org.kmontano.springboot.backend.chat.app.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Date;
import java.util.List;
import java.util.Random;

@Controller
public class ChatController {
    private MessageService service;
    private String[] colors = {"red", "blue", "magenta", "green", "orange", "purple", "yellow"};

    @Autowired
    private SimpMessagingTemplate webSocket;

    public ChatController(@Qualifier("messageServiceMongo") MessageService service) {
        this.service = service;
    }


    @MessageMapping("/message") // publica el msj
    @SendTo("/chat/message") // notifca a los usuarios
    public Message receiveMessage(Message message){
        message.setDate(new Date().getTime());
        if (message.getType().equals("NEW_USER")){
            message.setColor(this.colors[new Random().nextInt(colors.length)]);
            message.setText("nuevo usuario");
        } else {
            service.save(message);
        }
        return message;
    }

    @MessageMapping("/writing")
    @SendTo("/chat/writing")
    public String isWriting(String username){
        return username.concat(" esta escribiendo...");
    }

    @MessageMapping("/history")
    public void getHistoryMessages(String clientId){
        webSocket.convertAndSend("/chat/history/".concat(clientId), service.findAll());
    }
}
