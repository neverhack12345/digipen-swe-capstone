package com.digipen.se.financetracker.category;

import com.digipen.se.financetracker.model.SubCategoryDTO;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubCategoryService {
    private final SubCategoryRepository subCategoryRepository;

    public SubCategoryService(SubCategoryRepository subCategoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
    }

    public List<SubCategoryDTO> findAll() {
        return this.subCategoryRepository.findSubCategoriesDTO();
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

    public SubCategory findSubCategoryBySubId(Integer subId) {
        return this.subCategoryRepository.findById(subId).orElse(null);
    }
}
