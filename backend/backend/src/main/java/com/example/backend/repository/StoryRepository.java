package com.example.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.Story;

@Repository
public interface StoryRepository extends MongoRepository<Story, String> {
     // Query method to find stories within a specific age range
     List<Story> findByAgeBetween(int minAge, int maxAge);

     // Query method to find stories with age greater than or equal to a specific value (for > 15)
     List<Story> findByAgeGreaterThanEqual(int age);
}
