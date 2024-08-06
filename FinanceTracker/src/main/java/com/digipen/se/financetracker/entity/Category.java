package com.digipen.se.financetracker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.validator.constraints.Length;

import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "category")
public class Category {
    public static final int MAX_CHARACTERS = 255;
    @Column(name = "cat_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id private int catId;
    @NotBlank(message = "Category name cannot be blank!")
    @Length(max = 255, message = "Category name cannot be longer than 255 characters!")
    @Column(name = "cat_name")
    private String catName;
    @JsonIgnore
    @OneToMany(mappedBy = "category")
    @Fetch(FetchMode.SELECT)
    private List<Budget> budgetList;
    @JsonIgnore
    @OneToMany(mappedBy = "category")
    @Fetch(FetchMode.SELECT)
    private List<SubCategory> subCategoryList;
    public Category(String catName) {
        this.catName = catName;
    }
}