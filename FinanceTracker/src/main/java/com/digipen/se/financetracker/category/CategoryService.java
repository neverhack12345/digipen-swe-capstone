package com.digipen.se.financetracker.category;

import com.digipen.se.financetracker.entity.Category;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepo categoryRepo;

    CategoryService(CategoryRepo categoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    public List<Category> findAll() {
        return this.categoryRepo.findAll();
    }

    public Category findCategoryBySubCategoryId(Integer id) {
        return this.categoryRepo.findCategoryBySubCategoryId(id);
    }
}
