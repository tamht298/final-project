package com.thanhtam.backend.repository;

import com.thanhtam.backend.entity.Part;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartRepository extends JpaRepository<Part, Long> {
    Page<Part> findAllByCourseId(Long courseId, Pageable pageable);

}
