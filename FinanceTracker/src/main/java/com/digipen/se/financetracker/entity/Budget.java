package com.digipen.se.financetracker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@Entity
@Table(name = "budget")
public class Budget {
    @Column(name = "budget_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id private int budgetId;
    @Min(value = 1800, message = "Budget year has to be between 1800 and 9999!")
    @Max(value = 9999, message = "Budget year has to be between 1800 and 9999!")
    @Column(name = "year")
    private int year;
    @Min(value = 1, message = "Budget month has to be between 1 and 12")
    @Max(value = 12, message = "Budget month has to be between 1 and 12")
    @Column(name = "month")
    private int month;
    @NotNull(message = "Budget amount cannot be null!")
    @Column(name = "amount")
    private BigDecimal amount;
    @JsonIgnore
    @ManyToOne
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "cat_id", referencedColumnName = "cat_id")
    private Category category;
    @JsonIgnore
    @ManyToOne
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private UserAccount userAccount;

    public Budget(int year, int month, BigDecimal amount,
                  @Valid Category category, @Valid UserAccount userAccount) {
        this.year = year;
        this.month = month;
        this.amount = amount;
        this.category = category;
        this.userAccount = userAccount;
    }

    @JsonIgnore
    public void setBudgetId(int budgetId) {
        this.budgetId = budgetId;
    }
}
