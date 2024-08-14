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

    public CashFlow findCashFlowByFlow_Id(Integer flowId) {
        return this.cashFlowRepository.findById(flowId).orElse(null);
    }

    public List<CashFlowDTO> findAllByUserId(Integer userId) {
        return this.cashFlowRepository.findCashFlowDTOByUserAccount_UserIdOrderByDateDesc(userId);
    }

    public List<CashFlowDTO> findAllByUserId(Integer userId, Integer year) {
        return this.cashFlowRepository.findCashFlowDTOByYearAndUserAccount_UserIdOrderByDateDesc(userId, year);
    }

    public List<CashFlowDTO> findAllByUserId(Integer userId, Integer year, Integer month) {
        return this.cashFlowRepository.findCashFlowDTOByYearAndMonthAndUserAccount_UserIdOrderByDateDesc(
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
