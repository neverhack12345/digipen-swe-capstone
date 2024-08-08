package com.digipen.se.financetracker.model;

import com.digipen.se.financetracker.category.Category;
import com.digipen.se.financetracker.useraccount.UserAccount;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.math.BigDecimal;

@Data
public class BudgetDTO {
    private int budgetId;
    private int year;
    private int month;
    private BigDecimal amount;
    private int catId;
    private String catName;
    private int userId;

    public BudgetDTO(int budgetId, int year, int month, BigDecimal amount,
                     int catId, String catName, int userId) {
        this.budgetId = budgetId;
        this.year = year;
        this.month = month;
        this.amount = amount;
        this.catId = catId;
        this.catName = catName;
        this.userId = userId;
    }
}
