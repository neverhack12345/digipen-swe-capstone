package com.digipen.se.financetracker.budget;

import com.digipen.se.financetracker.entity.Budget;
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

    public List<Budget> findByUserId(Integer userId) {
        return this.budgetRepository.findAllByUserAccount_UserIdOrderByMonthYearDesc(userId);
    }

    public List<Budget> findByUserId(Integer userId, Integer year) {
        return this.budgetRepository.findAllByYearAndUserAccount_UserIdOrderByMonthYearDesc(userId, year);
    }

    public List<Budget> findByUserId(Integer userId, Integer year, Integer month) {
        return this.budgetRepository.findAllByYearAndMonthAndUserAccount_UserIdOrderByMonthYearDesc(
                userId, year, month);
    }
}
