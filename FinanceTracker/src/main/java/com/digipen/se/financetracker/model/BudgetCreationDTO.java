package com.digipen.se.financetracker.model;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class BudgetCreationDTO {
    private int userId, categoryId, year, month;
    private BigDecimal amount;
}
