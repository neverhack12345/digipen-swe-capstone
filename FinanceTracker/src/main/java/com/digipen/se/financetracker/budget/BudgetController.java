package com.digipen.se.financetracker.budget;

import com.digipen.se.financetracker.category.CategoryService;
import com.digipen.se.financetracker.category.Category;
import com.digipen.se.financetracker.useraccount.UserAccount;
import com.digipen.se.financetracker.exceptions.InvalidRequestParamException;
import com.digipen.se.financetracker.exceptions.ResourceNotFoundException;
import com.digipen.se.financetracker.model.BudgetCreationDTO;
import com.digipen.se.financetracker.model.BudgetUpdateDTO;
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
    public ResponseEntity<String> add(@RequestBody BudgetCreationDTO budgetCreationDTO)
            throws ResourceNotFoundException, InvalidRequestParamException, ConstraintViolationException {
        if (budgetCreationDTO.getAmount().compareTo(BigDecimal.ZERO) == 0) {
            throw new InvalidRequestParamException("Budget amount cannot be 0!");
        }
        if (this.budgetService.countBudgetByDetails(
                budgetCreationDTO.getUserId(), budgetCreationDTO.getYear(), budgetCreationDTO.getMonth()) > 0) {
            throw new InvalidRequestParamException("Budget already exists!");
        }
        UserAccount userAccount = this.userAccountService.findUserAccountByUserId(budgetCreationDTO.getUserId());
        if (userAccount == null) {
            throw new InvalidRequestParamException("User Id cannot be found!");
        }
        Category category = this.categoryService.findCategoryByCatId(budgetCreationDTO.getCategoryId());
        if (category == null) {
            throw new InvalidRequestParamException("Category Id cannot be found!");
        }
        Budget budget = new Budget(budgetCreationDTO.getYear(), budgetCreationDTO.getMonth(), budgetCreationDTO.getAmount(),
                category, userAccount);
        this.budgetService.add(budget);
        return ResponseEntity.ok().body("Add successful!");
    }

    @PostMapping("/update")
    public ResponseEntity<String> update(@RequestBody BudgetUpdateDTO budgetUpdateDTO)
            throws ResourceNotFoundException, InvalidRequestParamException, ConstraintViolationException {
        if (budgetUpdateDTO.getAmount().compareTo(BigDecimal.ZERO) == 0) {
            throw new InvalidRequestParamException("Budget amount cannot be 0!");
        }
        Budget currBudget = this.budgetService.findBudgetByBudget_Id(budgetUpdateDTO.getBudgetId());
        if (currBudget == null) {
            throw new ResourceNotFoundException("Budget not found!");
        }
        if (this.budgetService.countBudgetByDetails(
                currBudget.getUserAccount().getUserId(), budgetUpdateDTO.getYear(),
                budgetUpdateDTO.getMonth()) > 0) {
            throw new InvalidRequestParamException("Budget already exists!");
        }
        Category newCat = this.categoryService.findCategoryByCatId(budgetUpdateDTO.getCategoryId());
        if (newCat == null) {
            throw new InvalidRequestParamException("Category Id cannot be found!");
        }
        currBudget.setYear(budgetUpdateDTO.getYear());
        currBudget.setMonth(budgetUpdateDTO.getMonth());
        currBudget.setAmount(budgetUpdateDTO.getAmount());
        currBudget.setCategory(newCat);
        this.budgetService.add(currBudget);
        return ResponseEntity.ok().body("Update successful!");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam("id") Integer budgetId)
            throws ResourceNotFoundException {
        Budget budget = this.budgetService.findBudgetByBudget_Id(budgetId);
        if (budget == null) {
            throw new ResourceNotFoundException("Budget not found!");
        }
        this.budgetService.delete(budget);
        return ResponseEntity.ok().body("Delete successful!");
    }
}
