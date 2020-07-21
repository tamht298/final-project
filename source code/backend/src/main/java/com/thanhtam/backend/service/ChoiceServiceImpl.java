package com.thanhtam.backend.service;

import com.thanhtam.backend.repository.ChoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChoiceServiceImpl implements ChoiceService {

    private ChoiceRepository choiceRepository;

    @Autowired
    public ChoiceServiceImpl(ChoiceRepository choiceRepository) {
        this.choiceRepository = choiceRepository;
    }

    @Override
    public Integer findIsCorrectedById(Long id) {
        return choiceRepository.findIsCorrectedById(id);
    }

    @Override
    public String findChoiceTextById(Long id) {
        return choiceRepository.findChoiceTextById(id);
    }
}
