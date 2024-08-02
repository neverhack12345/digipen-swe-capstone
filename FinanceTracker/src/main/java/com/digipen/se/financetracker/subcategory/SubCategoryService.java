package com.digipen.se.financetracker.subcategory;

import com.digipen.se.financetracker.entity.SubCategory;
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
}
