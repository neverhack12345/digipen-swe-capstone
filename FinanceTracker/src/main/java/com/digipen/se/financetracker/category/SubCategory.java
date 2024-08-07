package com.digipen.se.financetracker.category;

import com.digipen.se.financetracker.cashflow.CashFlow;
import com.digipen.se.financetracker.category.Category;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.validator.constraints.Length;

import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "sub_category")
public class SubCategory {
    public static final int MAX_CHARACTERS = 255;
    @Column(name = "sub_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id private int subId;
    @NotBlank(message = "Sub-Category name cannot be blank!")
    @Length(max = 255, message = "Sub-Category name cannot be longer than 255 characters!")
    @Column(name = "sub_name")
    private String subName;
    @JsonIgnore
    @NotNull
    @ManyToOne
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "cat_id", referencedColumnName = "cat_id")
    private Category category;
    @JsonIgnore
    @OneToMany(mappedBy = "subCategory")
    @Fetch(FetchMode.SELECT)
    private List<CashFlow> cashFlowList;
    public SubCategory(String subName, Category category) {
        this.subName = subName;
        this.category = category;
    }
}
