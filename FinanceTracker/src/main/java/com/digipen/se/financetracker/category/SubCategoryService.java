package com.digipen.se.financetracker.category;

import com.digipen.se.financetracker.entity.SubCategory;
import com.digipen.se.financetracker.exception.InvalidInputException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubCategoryService {
    private final SubCategoryRepository subCategoryRepository;

    public SubCategoryService(SubCategoryRepository subCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }

    public List<SubCategory> findAll() {
        return this.subCategoryRepository.findAll();
    }

    public List<SubCategory> findSubCategoriesByCategory_CatId(Integer catId) {
        return this.subCategoryRepository.findSubCategoriesByCategory_CatId(catId);
    }

    public Long countSubCategoryBySubName(String subName) {
        return this.subCategoryRepository.countSubCategoryBySubName(subName);
    }

    public void add(@Valid SubCategory subCategory) {
        this.subCategoryRepository.save(subCategory);
    }
}
