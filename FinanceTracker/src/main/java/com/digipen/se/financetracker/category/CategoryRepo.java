package com.digipen.se.financetracker.category;

import com.digipen.se.financetracker.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Integer> {
    Category findCategoryBySubCategoryId(@Param("id") Integer subId);
}
