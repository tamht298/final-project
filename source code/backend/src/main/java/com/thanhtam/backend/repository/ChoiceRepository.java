package com.thanhtam.backend.repository;

import com.thanhtam.backend.entity.Choice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ChoiceRepository extends JpaRepository<Choice, Long> {
    @Query(value="select c.corrected from choice c where c.id = :id", nativeQuery=true)
    Integer findIsCorrectedById(Long id);

    @Query(value="select c.choice_text from choice c where c.id=:id", nativeQuery=true)
    String findChoiceTextById(Long id);
}
