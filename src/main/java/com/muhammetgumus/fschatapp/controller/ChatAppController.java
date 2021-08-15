package com.muhammetgumus.fschatapp.controller;

import com.muhammetgumus.fschatapp.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;

@RestController
public class ChatAppController {

    @MessageMapping("/chat.sendMessage")
    @SendTo("/chatTopic/general")
    public ChatMessage sendMessage(@RequestBody ChatMessage incomingMessage ){
        System.out.println(incomingMessage.toString());
        return incomingMessage;
    }

    @MessageMapping("/chat.addNewUser")
    @SendTo("/chatTopic/general")
    public ChatMessage addNewUser(@RequestBody ChatMessage incomingMessage,
                                  SimpMessageHeaderAccessor simpMessageHeaderAccessor){
        simpMessageHeaderAccessor.getSessionAttributes().put("username",incomingMessage.getMessageOwner());
        return  incomingMessage;
    }

}
