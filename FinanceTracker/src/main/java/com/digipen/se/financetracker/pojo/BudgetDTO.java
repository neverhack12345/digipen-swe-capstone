package com.digipen.se.financetracker.pojo;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class BudgetDTO {
    private int userId;
    private int categoryId;
    private int year;
    private int month;
    private BigDecimal amount;
}
