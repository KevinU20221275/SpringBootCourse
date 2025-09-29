package com.kmontano.springboot.springmvc.app.controllers;

import com.kmontano.springboot.springmvc.app.entities.User;
import com.kmontano.springboot.springmvc.app.services.UserService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Optional;

@Controller
@RequestMapping("/users")
@SessionAttributes({"user"})
public class UserController {
    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping({"/view", "/another"})
    public String view(Model model){
        model.addAttribute("title", "Hola mundo Spring Boot");
        model.addAttribute("message", "Este es una app sencilla de spring boot");
        model.addAttribute("user", new User("Kevin", "Montano"));
        return "view";
    }

    @GetMapping
    public String list(Model model){
        model.addAttribute("title", "Listado de usuarios");
        model.addAttribute("users", service.findAll());
        return "list";
    }

    @GetMapping("/form")
    public String form(Model model){
        model.addAttribute("title", "Crear Usuario");
        model.addAttribute("user", new User());
        return "form";
    }

    @GetMapping("/form/{id}")
    public String form(@PathVariable Long id, Model model, RedirectAttributes redirect){
        Optional<User> userOptional = service.findBy(id);
        if (userOptional.isPresent()){
            model.addAttribute("title", "Editar Usuario");
            model.addAttribute("user", userOptional.get());
            return "form";
        } else {
            redirect.addFlashAttribute("error", "El usuario con id " +
                    id + " no se ha encontrado!");
            return "redirect:/users";
        }
    }

    @PostMapping
    public String form(@Valid User user, BindingResult result, Model model, RedirectAttributes redirect, SessionStatus status){
        if (result.hasErrors()){
            model.addAttribute("title", "Validando Formulario");
            return "form";
        }

        String message = "";

        if (user.getId() != null && user.getId() > 0){
            message = "El usuario " + user.getName()  + " se a actualizado con exito";
        } else {
            message = "El usuario " + user.getName() + " se ha creado con exito";
        }

        service.save(user);
        status.setComplete();
        redirect.addFlashAttribute("success", message);
        return "redirect:/users";
    }

    @GetMapping("/delete/{id}")
    public String delete(@PathVariable Long id, RedirectAttributes redirect){
        Optional<User> userOptional = service.findBy(id);
        if (userOptional.isPresent()){
            redirect.addFlashAttribute("success", "El usuario " +
                  userOptional.get().getName()  + " se ha eliminado con exito!");
            service.delete(id);
            return "redirect:/users";
        } else {
            redirect.addFlashAttribute("error", "Error: el usuario con el id " +
                    userOptional.get().getId() + " no se ha podido eliminar!");
            return "redirect:/users";
        }
    }
}
