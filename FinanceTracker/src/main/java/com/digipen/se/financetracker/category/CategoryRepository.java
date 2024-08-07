package com.digipen.se.financetracker.category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query("SELECT sc.category FROM SubCategory sc WHERE sc.category.catId = :subId")
    Category findCategoryBySubCategory_SubId(@Param("subId") Integer subId);

    @Query("SELECT COUNT(c) FROM Category c WHERE LOWER(c.catName) = LOWER(:catName)")
    Long countCategoryByCatName(@Param("catName") String catName);

    @Query("SELECT COUNT(c) FROM Category c WHERE c.catId = :catId")
    Long countCategoryByCatId(@Param("catId") Integer catId);
}
