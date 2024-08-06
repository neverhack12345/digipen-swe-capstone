package com.digipen.se.financetracker.budget;

import com.digipen.se.financetracker.entities.Budget;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetService {
    private final BudgetRepository budgetRepository;

    public BudgetService(BudgetRepository budgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    public List<Budget> findAll() {
        return this.budgetRepository.findAll();
    }

    public Budget findBudgetByBudget_Id(Integer budgetId) {
        return this.budgetRepository.findById(budgetId).orElse(null);
    }

    public List<Budget> findAllByUserId(Integer userId) {
        return this.budgetRepository.findAllByUserAccount_UserIdOrderByMonthYearDesc(userId);
    }

    public List<Budget> findAllByUserId(Integer userId, Integer year) {
        return this.budgetRepository.findAllByYearAndUserAccount_UserIdOrderByMonthYearDesc(userId, year);
    }

    public List<Budget> findAllByUserId(Integer userId, Integer year, Integer month) {
        return this.budgetRepository.findAllByYearAndMonthAndUserAccount_UserIdOrderByMonthYearDesc(
                userId, year, month);
    }

    public Long countBudgetByDetails(Integer userId, Integer year, Integer month) {
        return this.budgetRepository.CountBudgetByUserAccount_UserIdAndYearAndMonth(userId, year, month);
    }

    public void add(@Valid Budget budget) {
        this.budgetRepository.save(budget);
    }

    public void delete(Budget budget) {
        this.budgetRepository.delete(budget);
    }
}
