package com.digipen.se.financetracker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

@Data
@NoArgsConstructor
@Entity
@NamedQuery(name = "Category.findCategoryBySubCategoryId",
        query = "SELECT sc.category FROM SubCategory sc WHERE sc.Id = :id")
@Table(name = "category")
public class Category {
    @Column(name = "cat_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id private int Id;
    @NotBlank
    @Max(255)
    @Column(name = "cat_name")
    private String name;
    @JsonIgnore
    @OneToMany(mappedBy = "category")
    @Fetch(FetchMode.SELECT)
    private List<Budget> budgetList;
    @JsonIgnore
    @OneToMany(mappedBy = "category")
    @Fetch(FetchMode.SELECT)
    private List<SubCategory> subCategoryList;
}