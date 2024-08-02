package com.digipen.se.financetracker.category;

import com.digipen.se.financetracker.entity.Category;
import org.springframework.stereotype.Service;

import java.util.List;

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
        return this.categoryRepository.findCategoryBySubCategoryId(subId);
    }
}
