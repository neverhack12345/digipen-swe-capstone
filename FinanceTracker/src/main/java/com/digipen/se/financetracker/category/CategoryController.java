package com.digipen.se.financetracker.category;

import com.digipen.se.financetracker.exceptions.InvalidRequestParamException;
import com.digipen.se.financetracker.exceptions.ResourceNotFoundException;
import com.digipen.se.financetracker.model.SubCategoryCreationDTO;
import com.digipen.se.financetracker.model.SubCategoryDTO;
import jakarta.validation.ConstraintViolationException;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class CategoryController {
    private final CategoryService categoryService;
    private final SubCategoryService subCategoryService;

    public CategoryController(
            CategoryService categoryService, SubCategoryService subCategoryService) {
        this.categoryService = categoryService;
        this.subCategoryService = subCategoryService;
    }

    @GetMapping("/category/getAll")
    public ResponseEntity<List<Category>> findCategories() throws ResourceNotFoundException {
        List<Category> categoryList = this.categoryService.findAll();
        if (categoryList.isEmpty()) {
            throw new ResourceNotFoundException("No category found!");
        }
        return ResponseEntity.ok().body(categoryList);
    }

    @GetMapping("/category/searchBySubCategory")
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

    @PostMapping("/category/add")
    public ResponseEntity<String> countCategoryByCatName(
            @RequestParam("name") String catName)
            throws InvalidRequestParamException, ConstraintViolationException {
        if (this.categoryService.countCategoryByCatName(catName) > 0) {
            throw new InvalidRequestParamException("Category name already exists!");
        }
        Category category = new Category(catName);
        this.categoryService.add(category);
        return ResponseEntity.ok().body("Add successful!");
    }

    @PostMapping("/category/update")
    public ResponseEntity<String> update(@RequestBody Category category)
            throws ResourceNotFoundException, ConstraintViolationException {
        Category currCat = this.categoryService.findCategoryByCatId(category.getCatId());
        if (currCat == null) {
            throw new ResourceNotFoundException("No category matching category id!");
        }
        currCat.setCatName(category.getCatName());
        this.categoryService.add(currCat);
        return ResponseEntity.ok().body("Update successful!");
    }

    @GetMapping("/subcategory/getAll")
    public ResponseEntity<List<SubCategoryDTO>> findSubCategories() throws ResourceNotFoundException {
        List<SubCategoryDTO> subCategoryList = this.subCategoryService.findAll();
        if (subCategoryList.isEmpty()) {
            throw new ResourceNotFoundException("No sub-category found!");
        }
        return ResponseEntity.ok().body(subCategoryList);
    }

    @GetMapping("/subcategory/searchByCategory")
    public ResponseEntity<List<SubCategory>> findSubCategoriesByCategory_CatId(@Param("id") Integer catId)
            throws ResourceNotFoundException, InvalidRequestParamException {
        if (catId < 0) {
            throw new InvalidRequestParamException("Id cannot be less than or equals 0!");
        }
        List<SubCategory> subCategoryList =
                this.subCategoryService.findSubCategoriesByCategory_CatId(catId);
        if (subCategoryList.isEmpty()) {
            throw new ResourceNotFoundException("No category found!");
        }
        return ResponseEntity.ok().body(subCategoryList);
    }

    @PostMapping("/subcategory/add")
    public ResponseEntity<String> add(@Param("name") String subName, @Param("catId") Integer catId)
            throws InvalidRequestParamException, ConstraintViolationException {
        if (this.subCategoryService.countSubCategoryBySubName(subName) > 0) {
            throw new InvalidRequestParamException("Sub-Category name already exists!");
        }
        Category category = this.categoryService.findCategoryByCatId(catId);
        if (category == null) {
            throw new InvalidRequestParamException("Category does not exist!");
        }
        SubCategory subCategory = new SubCategory(subName, category);
        this.subCategoryService.add(subCategory);
        return ResponseEntity.ok().body("Add successful!");
    }

    @PostMapping("/subcategory/update")
    public ResponseEntity<String> update(@RequestBody SubCategoryCreationDTO subCategoryCreationDTO)
            throws ResourceNotFoundException, InvalidRequestParamException, ConstraintViolationException {
        SubCategory currSub = this.subCategoryService.findSubCategoryBySubId(subCategoryCreationDTO.getSubId());
        if (currSub == null) {
            throw new ResourceNotFoundException("No sub-category matching sub-category id!");
        }
        if (this.subCategoryService.countSubCategoryBySubName(subCategoryCreationDTO.getSubName()) > 0) {
            throw new InvalidRequestParamException(
                    "There is an existing sub-category with the same name!");
        }
        Category newCat = this.categoryService.findCategoryByCatId(subCategoryCreationDTO.getCatId());
        if (newCat == null) {
            throw new ResourceNotFoundException("No category matching category id!");
        }
        currSub.setSubName(subCategoryCreationDTO.getSubName());
        currSub.setCategory(newCat);
        this.subCategoryService.add(currSub);
        return ResponseEntity.ok().body("Update successful!");
    }
}
