package com.digipen.se.financetracker.cashflow;

import com.digipen.se.financetracker.entity.Budget;
import com.digipen.se.financetracker.entity.CashFlow;
import com.digipen.se.financetracker.exception.InvalidRequestParamException;
import com.digipen.se.financetracker.exception.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/cashflow")
public class CashFlowController {
    private final CashFlowService cashFlowService;

    public CashFlowController(CashFlowService cashFlowService) {
        this.cashFlowService = cashFlowService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<CashFlow>> findAll() throws ResourceNotFoundException {
        List<CashFlow> cashFlowList = this.cashFlowService.findAll();
        if (cashFlowList.isEmpty()) {
            throw new ResourceNotFoundException("No cash flow found!");
        }
        return ResponseEntity.ok().body(cashFlowList);
    }

    @GetMapping("/searchByUserId")
    public ResponseEntity<List<CashFlow>> findByUserId(
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
        List<CashFlow> cashFlowList = this.cashFlowService.findAll();
        if (cashFlowList.isEmpty()) {
            throw new ResourceNotFoundException("No cash flow found!");
        }
        return ResponseEntity.ok().body(cashFlowList);
    }
}
