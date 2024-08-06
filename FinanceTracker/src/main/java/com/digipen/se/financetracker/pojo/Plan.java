package com.digipen.se.financetracker.pojo;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class Plan {
    private BigDecimal principal, interestPerYear, yearlyContribution, yearlyWithdrawAmount;
    private int yearsContributing;
    private int yearStartWithdraw;
    private int yearsProjected;
}
