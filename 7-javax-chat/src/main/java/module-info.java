module org.kmontano.cliente.javafx.chatapp.appjavaxchat {
    requires javafx.controls;
    requires javafx.fxml;
    requires javafx.base;
    requires java.net.http;
    requires spring.websocket;
    requires spring.messaging;
    requires com.fasterxml.jackson.databind;
    requires java.logging;

    requires org.kordamp.bootstrapfx.core;

    opens org.kmontano.cliente.javafx.chatapp.appjavaxchat.models to javafx.base, com.fasterxml.jackson.databind;
    exports org.kmontano.cliente.javafx.chatapp.appjavaxchat;
}