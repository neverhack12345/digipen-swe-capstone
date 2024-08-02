package com.digipen.se.financetracker.subcategory;

import com.digipen.se.financetracker.entity.SubCategory;
import com.digipen.se.financetracker.exception.InvalidRequestParamException;
import com.digipen.se.financetracker.exception.ResourceNotFoundException;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/subcategory")
public class SubCategoryController {
    private final SubCategoryService subCategoryService;

    private SubCategoryController(SubCategoryService subCategoryService) {
        this.subCategoryService = subCategoryService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> findAll() throws ResourceNotFoundException {
        List<SubCategory> subCategoryList = this.subCategoryService.findAll();
        if (subCategoryList.isEmpty()) {
            throw new ResourceNotFoundException("No sub-category found!");
        }
        return ResponseEntity.ok().body(subCategoryList);
    }

    @GetMapping("/searchByCategory")
    public ResponseEntity<?> findSubCategoriesByCategory_CatId(@Param("id") Integer catId)
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
}
