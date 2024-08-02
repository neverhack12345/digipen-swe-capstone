package com.digipen.se.financetracker.budget;

import com.digipen.se.financetracker.entity.Budget;
import com.digipen.se.financetracker.exception.InvalidRequestParamException;
import com.digipen.se.financetracker.exception.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budget")
public class BudgetController {
    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Budget>> findAll() throws ResourceNotFoundException {
        List<Budget> budgetList = this.budgetService.findAll();
        if (budgetList.isEmpty()) {
            throw new ResourceNotFoundException("No budget found!");
        }
        return ResponseEntity.ok().body(budgetList);
    }

    @GetMapping("/searchByUserId")
    public ResponseEntity<List<Budget>> findByUserId(
            @RequestParam("id") Integer userId,
            @RequestParam(value = "year", required = false) Integer year,
            @RequestParam(value = "month", required = false) Integer month)
            throws ResourceNotFoundException, InvalidRequestParamException {
        if (userId <= 0) {
            throw new InvalidRequestParamException("Id cannot be less than or equals 0!");
        }
        if (year != null) if (year <= 0) {
            throw new InvalidRequestParamException("Year cannot be less than or equals 0!");
        }
        if (month != null) if (month <= 0) {
            throw new InvalidRequestParamException("Month cannot be less than or equals 0!");
        }
        List<Budget> budgetList;
        if (year != null && month != null) {
            budgetList = this.budgetService.findByUserId(userId, year, month);
        } else if (year != null) {
            budgetList = this.budgetService.findByUserId(userId, year);
        } else {
            budgetList = this.budgetService.findByUserId(userId);
        }
        if (budgetList.isEmpty()) {
            throw new ResourceNotFoundException("No budget found!");
        }
        return ResponseEntity.ok().body(budgetList);
    }

}
