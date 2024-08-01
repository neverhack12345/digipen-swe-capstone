package com.digipen.se.financetracker.category;

import com.digipen.se.financetracker.entity.Category;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        List<Category> categoryList = this.categoryService.findAll();
        if (categoryList.isEmpty()) {
            return ResponseEntity.ok().body("Category is empty!");
        }
        return ResponseEntity.ok().body(categoryList);
    }

    @GetMapping("/searchBySubCategory")
    public ResponseEntity<?> getCategoryBySubCategory(@RequestParam("id") Integer id) {
        Category cat = this.categoryService.findCategoryBySubCategoryId(id);
        return ResponseEntity.ok().body(Objects.requireNonNullElse(cat, "Sub-Category id does not exist!"));
    }
}
