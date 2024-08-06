package com.digipen.se.financetracker.cashflow;

import com.digipen.se.financetracker.category.SubCategoryService;
import com.digipen.se.financetracker.entities.*;
import com.digipen.se.financetracker.exceptions.InvalidRequestParamException;
import com.digipen.se.financetracker.exceptions.ResourceNotFoundException;
import com.digipen.se.financetracker.pojo.CashFlowDTO;
import com.digipen.se.financetracker.useraccount.UserAccountService;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/cashflow")
public class CashFlowController {
    private final CashFlowService cashFlowService;
    private final UserAccountService userAccountService;
    private final SubCategoryService subCategoryService;

    public CashFlowController(CashFlowService cashFlowService, UserAccountService userAccountService,
                              SubCategoryService subCategoryService) {
        this.cashFlowService = cashFlowService;
        this.userAccountService = userAccountService;
        this.subCategoryService = subCategoryService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<CashFlow>> findCashFlows() throws ResourceNotFoundException {
        List<CashFlow> cashFlowList = this.cashFlowService.findAll();
        if (cashFlowList.isEmpty()) {
            throw new ResourceNotFoundException("No cash flow found!");
        }
        return ResponseEntity.ok().body(cashFlowList);
    }

    @GetMapping("/searchByUserId")
    public ResponseEntity<List<CashFlow>> findCashFlowByUserId(
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
        List<CashFlow> cashFlowList;
        if (year != null && month != null) {
            cashFlowList = this.cashFlowService.findAllByUserId(userId, year, month);
        } else if (year != null) {
            cashFlowList = this.cashFlowService.findAllByUserId(userId, year);
        } else {
            cashFlowList = this.cashFlowService.findAllByUserId(userId);
        }
        if (cashFlowList.isEmpty()) {
            throw new ResourceNotFoundException("No cash flow found!");
        }
        return ResponseEntity.ok().body(cashFlowList);
    }

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody CashFlowDTO cashFlowDTO)
            throws ResourceNotFoundException, InvalidRequestParamException, ConstraintViolationException {
        if (cashFlowDTO.getAmount().compareTo(BigDecimal.ZERO) == 0) {
            throw new InvalidRequestParamException("Cash flow amount cannot be 0!");
        }
        if (this.cashFlowService.countCashFlowByDetails(
                cashFlowDTO.getSourceName(), cashFlowDTO.getDate()) > 0) {
            throw new InvalidRequestParamException("Cash flow already exists!");
        }
        UserAccount userAccount = this.userAccountService.findUserAccountByUserId(cashFlowDTO.getUserId());
        if (userAccount == null) {
            throw new InvalidRequestParamException("User Id cannot be found!");
        }
        SubCategory subCategory = this.subCategoryService.findSubCategoryBySubId(cashFlowDTO.getSubId());
        if (subCategory == null) {
            throw new InvalidRequestParamException("Sub-Category Id cannot be found!");
        }
        CashFlow cashFlow = new CashFlow(cashFlowDTO.getSourceName(), cashFlowDTO.getDate(),
                cashFlowDTO.getAmount(), cashFlowDTO.getRemark(), subCategory, userAccount);
        this.cashFlowService.add(cashFlow);
        return ResponseEntity.ok().body("Add successful!");
    }
}
