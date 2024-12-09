package com.example.backend.controller;

import java.util.List;

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

import com.example.backend.model.Story;
import com.example.backend.repository.StoryRepository;

@RestController
@RequestMapping("/api/stories")
@CrossOrigin(origins = "http://localhost:3000")
public class StoryController {

    @Autowired
    private StoryRepository storyRepository;

    // Get all stories
    @GetMapping
    public List<Story> getAllStories() {
        return storyRepository.findAll();
    }

    @GetMapping("/age/3-8")
    public List<Story> getStoriesForChildren3to8() {
        return storyRepository.findByAgeBetween(3, 8);
    }

    // Get stories for ages 8-15
    @GetMapping("/age/8-15")
    public List<Story> getStoriesForChildren8to15() {
        return storyRepository.findByAgeBetween(8, 15);
    }

    // Get stories for ages 15+
    @GetMapping("/age/15+")
    public List<Story> getStoriesForAbove15() {
        return storyRepository.findByAgeGreaterThanEqual(15);
    }

    // Create new story
    @PostMapping
    public Story createStory(@RequestBody Story story) {
        return storyRepository.save(story);
    }

    // Update story by id
    @PutMapping("/{id}")
    public ResponseEntity<Story> updateStory(@PathVariable String id, @RequestBody Story story) {
    if (storyRepository.existsById(id)) {
        story.setStoryId(id);
        Story updatedStory = storyRepository.save(story);
        return ResponseEntity.ok(updatedStory);
    }
    return ResponseEntity.notFound().build();
}


    // Delete story by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStory(@PathVariable String id) {
        if (storyRepository.existsById(id)) {
            storyRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
