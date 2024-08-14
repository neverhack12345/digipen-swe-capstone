package com.digipen.se.financetracker.model;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class GeneratedPlan {
    private int year;
    private BigDecimal yearlyPrincipal, yearlyContribution, yearlyWithdraw, yearlyInterest;

    public GeneratedPlan(int year, BigDecimal yearlyPrincipal, BigDecimal yearlyContribution,
                         BigDecimal yearlyWithdraw, BigDecimal yearlyInterest) {
        this.year = year;
        this.yearlyPrincipal = yearlyPrincipal;
        this.yearlyContribution = yearlyContribution;
        this.yearlyWithdraw = yearlyWithdraw;
        this.yearlyInterest = yearlyInterest;
    }
}
