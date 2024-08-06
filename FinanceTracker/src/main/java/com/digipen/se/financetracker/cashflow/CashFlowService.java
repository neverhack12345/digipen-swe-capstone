package com.digipen.se.financetracker.cashflow;

import com.digipen.se.financetracker.entities.CashFlow;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CashFlowService {
    private final CashFlowRepository cashFlowRepository;

    public CashFlowService(CashFlowRepository cashFlowRepository) {
        this.cashFlowRepository = cashFlowRepository;
    }

    public List<CashFlow> findAll() {
        return this.cashFlowRepository.findAll();
    }

    public List<CashFlow> findAllByUserId(Integer userId) {
        return this.cashFlowRepository.findAllByUserAccount_UserIdOrderByDateDesc(userId);
    }

    public List<CashFlow> findAllByUserId(Integer userId, Integer year) {
        return this.cashFlowRepository.findAllByYearAndUserAccount_UserIdOrderByDateDesc(userId, year);
    }

    public List<CashFlow> findAllByUserId(Integer userId, Integer year, Integer month) {
        return this.cashFlowRepository.findAllByYearAndMonthAndUserAccount_UserIdOrderByDateDesc(
                userId, year, month);
    }

    public Long countCashFlowByDetails(String name, LocalDate date) {
        return this.cashFlowRepository.countCashFlowBySourceNameAndDate(name, date);
    }

    public void add(@Valid CashFlow cashFlow) {
        this.cashFlowRepository.save(cashFlow);
    }
}
