package com.digipen.se.financetracker.category;

import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> findAll() {
        return this.categoryRepository.findAll();
    }

    public Category findCategoryBySubCategoryId(Integer subId) {
        return this.categoryRepository.findCategoryBySubCategory_SubId(subId);
    }

    public Long countCategoryByCatName(String catName) {
        return this.categoryRepository.countCategoryByCatName(catName);
    }

    //TODO check if required
    public Long countCategoryByCatId(Integer catId) {
        return this.categoryRepository.countCategoryByCatId(catId);
    }

    public Category findCategoryByCatId(Integer catId) {
        Optional<Category> categoryOptional = this.categoryRepository.findById(catId);
        return categoryOptional.orElse(null);
    }

    public void add(@Valid Category category) {
        this.categoryRepository.save(category);
    }
}
