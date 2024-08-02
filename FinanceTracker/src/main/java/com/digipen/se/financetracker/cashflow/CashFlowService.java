package com.digipen.se.financetracker.cashflow;

import com.digipen.se.financetracker.entity.CashFlow;
import org.springframework.stereotype.Service;

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

    public List<CashFlow> findByUserId(Integer userId) {
        return this.cashFlowRepository.findAllByUserAccount_UserIdOrderByDateDesc(userId);
    }

    public List<CashFlow> findByUserId(Integer userId, Integer year) {
        return this.cashFlowRepository.findAllByYearAndUserAccount_UserIdOrderByDateDesc(userId, year);
    }

    public List<CashFlow> findByUserId(Integer userId, Integer year, Integer month) {
        return this.cashFlowRepository.findAllByYearAndMonthAndUserAccount_UserIdOrderByDateDesc(
                userId, year, month);
    }

}
