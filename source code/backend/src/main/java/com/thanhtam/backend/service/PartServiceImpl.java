package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.Course;
import com.thanhtam.backend.entity.Part;
import com.thanhtam.backend.repository.PartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PartServiceImpl implements PartService {

    private PartRepository partRepository;

    @Autowired
    public PartServiceImpl(PartRepository partRepository) {
        this.partRepository = partRepository;
    }

    @Override
    public void savePart(Part part) {
        partRepository.save(part);
    }

    @Override
    public Page<Part> getPartLisByCourse(Pageable pageable, Long courseId) {
        return partRepository.findAllByCourseId(courseId, pageable);
    }

    @Override
    public List<Part> getPartListByCourse(Course course) {
        return partRepository.findAllByCourse(course);
    }

    @Override
    public Optional<Part> findPartById(Long id) {
        return partRepository.findById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return partRepository.existsById(id);
    }
}
