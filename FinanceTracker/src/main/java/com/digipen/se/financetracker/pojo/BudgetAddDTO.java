package com.digipen.se.financetracker.pojo;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class BudgetAddDTO {
    private int userId, categoryId, year, month;
    private BigDecimal amount;
}
