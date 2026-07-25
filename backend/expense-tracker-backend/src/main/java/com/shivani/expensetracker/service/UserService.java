package com.shivani.expensetracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shivani.expensetracker.entity.User;
import com.shivani.expensetracker.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        return userRepository.save(user);
    }
    
    public User loginUser(String email, String password) {
    return userRepository.findByEmail(email)
            .filter(user -> user.getPassword().equals(password))
            .orElse(null);
}
}