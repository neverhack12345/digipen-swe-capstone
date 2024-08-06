package com.digipen.se.financetracker.category;

import com.digipen.se.financetracker.entities.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, Integer> {
    @Query("SELECT sc from SubCategory sc WHERE sc.category.catId = :catId")
    List<SubCategory> findSubCategoriesByCategory_CatId(@Param("catId") Integer catId);

    @Query("SELECT COUNT(sc) from SubCategory sc WHERE LOWER(sc.subName) = LOWER(:subName)")
    Long countSubCategoryBySubName(@Param("subName") String subName);
}
