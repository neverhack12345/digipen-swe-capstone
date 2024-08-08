package com.digipen.se.financetracker.cashflow;

import com.digipen.se.financetracker.model.CashFlowDTO;
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

    public List<CashFlowDTO> findAll() {
        return this.cashFlowRepository.findCashFlowDTO();
    }

    public List<CashFlow> findAllByUserId(Integer userId) {
        return this.cashFlowRepository.findAllByUserAccount_UserIdOrderByDateDesc(userId);
    }

    public CashFlow findCashFlowByFlow_Id(Integer flowId) {
        return this.cashFlowRepository.findById(flowId).orElse(null);
    }

    public List<CashFlow> findAllByUserId(Integer userId, Integer year) {
        return this.cashFlowRepository.findAllByYearAndUserAccount_UserIdOrderByDateDesc(userId, year);
    }

    public List<CashFlow> findAllByUserId(Integer userId, Integer year, Integer month) {
        return this.cashFlowRepository.findAllByYearAndMonthAndUserAccount_UserIdOrderByDateDesc(
                userId, year, month);
    }

    public Long countCashFlowByDetails(Integer userId, String name, LocalDate date) {
        return this.cashFlowRepository.countCashFlowByUserAccount_UserIdSourceNameAndDate(userId, name, date);
    }

    public void add(@Valid CashFlow cashFlow) {
        this.cashFlowRepository.save(cashFlow);
    }

    public void delete(CashFlow cashFlow) {
        this.cashFlowRepository.delete(cashFlow);
    }
}
