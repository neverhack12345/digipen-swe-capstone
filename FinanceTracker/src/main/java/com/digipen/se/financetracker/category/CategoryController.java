package com.digipen.se.financetracker.category;

import com.digipen.se.financetracker.entity.Category;
import com.digipen.se.financetracker.exception.InvalidRequestParamException;
import com.digipen.se.financetracker.exception.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Category>> findAll() throws ResourceNotFoundException {
        List<Category> categoryList = this.categoryService.findAll();
        if (categoryList.isEmpty()) {
            throw new ResourceNotFoundException("No category found!");
        }
        return ResponseEntity.ok().body(categoryList);
    }

    @GetMapping("/searchBySubCategory")
    public ResponseEntity<Category> findCategoryBySubCategory(
            @RequestParam("id") Integer subId)
            throws ResourceNotFoundException, InvalidRequestParamException {
        if (subId <= 0) {
            throw new InvalidRequestParamException("Id cannot be less than or equals 0!");
        }
        Category cat = this.categoryService.findCategoryBySubCategoryId(subId);
        if (cat == null) {
            throw new ResourceNotFoundException("No category found!");
        }
        return ResponseEntity.ok().body(cat);
    }
}
