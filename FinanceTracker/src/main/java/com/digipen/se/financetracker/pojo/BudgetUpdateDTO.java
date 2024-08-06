package com.digipen.se.financetracker.pojo;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class BudgetUpdateDTO {
    private int budgetId, categoryId, year, month;
    private BigDecimal amount;
}
