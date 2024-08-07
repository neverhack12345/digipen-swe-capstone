package com.digipen.se.financetracker.plan;

import com.digipen.se.financetracker.exceptions.InvalidRequestParamException;
import com.digipen.se.financetracker.model.GeneratedPlan;
import com.digipen.se.financetracker.model.Plan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/plan")
public class PlanController {
    private final PlanService planService;
    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    @GetMapping("/generateProjection")
    public ResponseEntity<List<GeneratedPlan>> generateProjection(
            @RequestParam("principal")BigDecimal principal,
            @RequestParam("interestPerYear") BigDecimal interestPerYear,
            @RequestParam("yearlyContribution") BigDecimal yearlyContribution,
            @RequestParam("yearlyWithdrawAmount") BigDecimal yearlyWithdrawAmount,
            @RequestParam("yearsContributing") Integer yearsContributing,
            @RequestParam("yearStartWithdraw") Integer yearStartWithdraw,
            @RequestParam("yearsProjected") Integer yearsProjected) {
        if (principal.compareTo(BigDecimal.ZERO) < 0) {
            throw new InvalidRequestParamException("Principal cannot be negative!");
        }
        if (interestPerYear.compareTo(BigDecimal.ZERO) < 0) {
            throw new InvalidRequestParamException("Interest per year cannot be negative!");
        }
        if (yearlyContribution.compareTo(BigDecimal.ZERO) < 0) {
            throw new InvalidRequestParamException("Yearly contribution cannot be negative!");
        }
        if (yearlyWithdrawAmount.compareTo(BigDecimal.ZERO) < 0) {
            throw new InvalidRequestParamException("Yearly withdraw cannot be negative!");
        }
        if (yearsContributing < 0) {
            throw new InvalidRequestParamException("Years contributing cannot be negative!");
        }
        if (yearStartWithdraw < 0) {
            throw new InvalidRequestParamException("Year start withdraw cannot be negative!");
        }
        if (yearsProjected <= 0) {
            throw new InvalidRequestParamException("Years projected cannot be zero or negative!");
        }
        Plan plan = new Plan();
        plan.setPrincipal(principal);
        plan.setInterestPerYear(interestPerYear);
        plan.setYearlyContribution(yearlyContribution);
        plan.setYearlyWithdrawAmount(yearlyWithdrawAmount);
        plan.setYearsContributing(yearsContributing);
        plan.setYearStartWithdraw(yearStartWithdraw);
        plan.setYearsProjected(yearsProjected);
        List<GeneratedPlan> result = this.planService.generateProjection(plan);
        return ResponseEntity.ok().body(result);
    }
}
