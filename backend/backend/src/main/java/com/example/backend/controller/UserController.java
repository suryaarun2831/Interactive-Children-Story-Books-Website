    package com.example.backend.controller;

    import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;

    @RestController
    @RequestMapping("/users")
    @CrossOrigin(origins = "http://localhost:3000")
    public class UserController {

        @Autowired
        private UserRepository userRepository;

        @Autowired
    private SequenceGeneratorService sequenceGenerator;

        // Get all users
        @GetMapping
        public List<User> getAllUsers() {
            return userRepository.findAll();
        }

        // Register new user
        @PostMapping("/post")
        public User registerUser(@RequestBody User user) {
            user.setId(sequenceGenerator.generateSequence(User.SEQUENCE_NAME));
        return userRepository.save(user);
        }

        // Edit user by id
        @PutMapping("/edit/{id}")
public ResponseEntity<User> updateUser(@PathVariable("id") int id, @RequestBody User user) {
    if (userRepository.existsById(id)) {
        user.setId(id); // Make sure the ID is set correctly
        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }
    return ResponseEntity.notFound().build(); // Return 404 if user not found
}

        // Delete user by id
        @DeleteMapping("/delete/{id}")
        public ResponseEntity<Void> deleteUser(@PathVariable int id) {
            if (userRepository.existsById(id)) {
                userRepository.deleteById(id);
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.notFound().build();
        }

        // Add a story to favorites
    @PostMapping("/{userId}/favorites/{storyId}")
public ResponseEntity<User> addFavoriteStory(@PathVariable int userId, @PathVariable String storyId) {
    Optional<User> optionalUser = userRepository.findById(userId);
    if (optionalUser.isPresent()) {
        User user = optionalUser.get();

        // Initialize favorites if it is null
        List<String> favorites = user.getFavorites();
        if (favorites == null) {
            favorites = new ArrayList<>();
            user.setFavorites(favorites);
        }

        // Add storyId to favorites if it isn't already present
        if (!favorites.contains(storyId)) {
            favorites.add(storyId);
            userRepository.save(user);
        }
        return ResponseEntity.ok(user);
    }
    return ResponseEntity.notFound().build();
}


    // Remove a story from favorites
    @DeleteMapping("/{userId}/favorites/{storyId}")
    public ResponseEntity<User> removeFavoriteStory(@PathVariable int userId, @PathVariable String storyId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<String> favorites = user.getFavorites();
            if (favorites.contains(storyId)) {
                favorites.remove(storyId);
                userRepository.save(user);
            }
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }
    }
