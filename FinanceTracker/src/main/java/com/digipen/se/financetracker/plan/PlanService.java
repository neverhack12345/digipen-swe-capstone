package com.digipen.se.financetracker.plan;

import com.digipen.se.financetracker.model.GeneratedPlan;
import com.digipen.se.financetracker.model.Plan;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
public class PlanService {
    public List<GeneratedPlan> generateProjection(@Valid Plan plan) {
        List<GeneratedPlan> result = new ArrayList<>();
        result.add(new GeneratedPlan(0, plan.getPrincipal(), BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO));
        BigDecimal currPrincipal = plan.getPrincipal();
        BigDecimal currInterest;
        BigDecimal currContribution = BigDecimal.ZERO;
        BigDecimal currWithdraw = BigDecimal.ZERO;
        for (int year = 1; year <= plan.getYearsProjected(); ++year) {
            currWithdraw = BigDecimal.ZERO;
            currContribution = BigDecimal.ZERO;
            if (year <= plan.getYearsContributing()) {
                currPrincipal = currPrincipal.add(plan.getYearlyContribution());
                currContribution = plan.getYearlyContribution();
            }
            if (year >= plan.getYearStartWithdraw()) {
                currWithdraw = plan.getYearlyWithdrawAmount();
                currPrincipal = currPrincipal.subtract(currWithdraw);
            }
            currInterest = currPrincipal.multiply(plan.getInterestPerYear());
            currPrincipal = currPrincipal.add(currInterest);
            result.add(new GeneratedPlan(year, currPrincipal.setScale(2, RoundingMode.DOWN),
                    currContribution,  currWithdraw, currInterest.setScale(2, RoundingMode.DOWN)));

        }
        return result;
    }
}
