package com.digipen.se.financetracker.pojo;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class GeneratedPlan {
    private int year;
    private BigDecimal yearlyPrincipal, yearlyWithdraw, yearlyInterest;

    public GeneratedPlan(int year, BigDecimal yearlyPrincipal,
                         BigDecimal yearlyWithdraw, BigDecimal yearlyInterest) {
        this.year = year;
        this.yearlyPrincipal = yearlyPrincipal;
        this.yearlyWithdraw = yearlyWithdraw;
        this.yearlyInterest = yearlyInterest;
    }
}
