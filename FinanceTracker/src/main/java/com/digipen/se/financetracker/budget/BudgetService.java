package com.digipen.se.financetracker.budget;

import com.digipen.se.financetracker.model.BudgetDTO;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetService {
    private final BudgetRepository budgetRepository;

    public BudgetService(BudgetRepository budgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    public List<BudgetDTO> findAll() {
        return this.budgetRepository.findBudgetDTO();
    }

    public Budget findBudgetByBudget_Id(Integer budgetId) {
        return this.budgetRepository.findById(budgetId).orElse(null);
    }

    public BudgetDTO findBudgetDTOByBudget_Id(Integer budgetId) {
        return this.budgetRepository.findBudgetDTOByBudget_Id(budgetId);
    }

    public List<BudgetDTO> findBudgetDTOByUserId(Integer userId) {
        return this.budgetRepository.findBudgetDTOByUserAccount_UserIdOrderByMonthYearDesc(userId);
    }

    public List<BudgetDTO> findBudgetDTOByUserId(Integer userId, Integer year) {
        return this.budgetRepository.findBudgetDTOByYearAndUserAccount_UserIdOrderByMonthYearDesc(userId, year);
    }

    public List<BudgetDTO> findBudgetDTOByUserId(Integer userId, Integer year, Integer month) {
        return this.budgetRepository.findBudgetDTOByYearAndMonthAndUserAccount_UserIdOrderByMonthYearDesc(
                userId, year, month);
    }

    public Long countBudgetByDetails(Integer userId, Integer catId, Integer year, Integer month) {
        return this.budgetRepository.CountBudgetByUserAccount_UserIdAndCategory_CategoryIdAndYearAndMonth(
                userId, catId, year, month);
    }

    public void add(@Valid Budget budget) {
        this.budgetRepository.save(budget);
    }

    public void delete(Budget budget) {
        this.budgetRepository.delete(budget);
    }
}
