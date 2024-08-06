package com.digipen.se.financetracker.budget;

import com.digipen.se.financetracker.category.CategoryService;
import com.digipen.se.financetracker.entities.Budget;
import com.digipen.se.financetracker.entities.Category;
import com.digipen.se.financetracker.entities.UserAccount;
import com.digipen.se.financetracker.exceptions.InvalidRequestParamException;
import com.digipen.se.financetracker.exceptions.ResourceNotFoundException;
import com.digipen.se.financetracker.pojo.BudgetDTO;
import com.digipen.se.financetracker.useraccount.UserAccountService;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/budget")
public class BudgetController {
    private final BudgetService budgetService;
    private final UserAccountService userAccountService;
    private final CategoryService categoryService;

    public BudgetController(BudgetService budgetService, UserAccountService userAccountService,
                            CategoryService categoryService) {
        this.budgetService = budgetService;
        this.userAccountService = userAccountService;
        this.categoryService = categoryService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Budget>> findUserAccounts() throws ResourceNotFoundException {
        List<Budget> budgetList = this.budgetService.findAll();
        if (budgetList.isEmpty()) {
            throw new ResourceNotFoundException("No budget found!");
        }
        return ResponseEntity.ok().body(budgetList);
    }

    @GetMapping("/searchByUserId")
    public ResponseEntity<List<Budget>> findUserAccountByUserId(
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
            budgetList = this.budgetService.findAllByUserId(userId, year, month);
        } else if (year != null) {
            budgetList = this.budgetService.findAllByUserId(userId, year);
        } else {
            budgetList = this.budgetService.findAllByUserId(userId);
        }
        if (budgetList.isEmpty()) {
            throw new ResourceNotFoundException("No budget found!");
        }
        return ResponseEntity.ok().body(budgetList);
    }

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody BudgetDTO budgetDTO)
            throws ResourceNotFoundException, InvalidRequestParamException, ConstraintViolationException {
        if (budgetDTO.getAmount().compareTo(BigDecimal.ZERO) == 0) {
            throw new InvalidRequestParamException("Budget amount cannot be 0!");
        }
        if (this.budgetService.countBudgetByDetails(
                budgetDTO.getUserId(), budgetDTO.getYear(), budgetDTO.getMonth()) > 0) {
            throw new InvalidRequestParamException("Budget already exists!");
        }
        UserAccount userAccount = this.userAccountService.findUserAccountByUserId(budgetDTO.getUserId());
        if (userAccount == null) {
            throw new InvalidRequestParamException("User Id cannot be found!");
        }
        Category category = this.categoryService.findCategoryByCatId(budgetDTO.getCategoryId());
        if (category == null) {
            throw new InvalidRequestParamException("Category Id cannot be found!");
        }
        Budget budget = new Budget(budgetDTO.getYear(), budgetDTO.getMonth(), budgetDTO.getAmount(),
                category, userAccount);
        this.budgetService.add(budget);
        return ResponseEntity.ok().body("Add successful!");
    }
}
