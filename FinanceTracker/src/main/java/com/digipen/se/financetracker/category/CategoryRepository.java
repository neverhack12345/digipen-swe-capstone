package com.digipen.se.financetracker.category;

import com.digipen.se.financetracker.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Category findCategoryBySubCategoryId(@Param("subId") Integer subId);
}
