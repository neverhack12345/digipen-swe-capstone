package com.digipen.se.financetracker.cashflow;

import com.digipen.se.financetracker.category.SubCategory;
import com.digipen.se.financetracker.category.SubCategoryService;
import com.digipen.se.financetracker.exceptions.InvalidRequestParamException;
import com.digipen.se.financetracker.exceptions.ResourceNotFoundException;
import com.digipen.se.financetracker.model.CashFlowCreationDTO;
import com.digipen.se.financetracker.model.CashFlowDTO;
import com.digipen.se.financetracker.model.CashFlowUpdateDTO;
import com.digipen.se.financetracker.useraccount.UserAccount;
import com.digipen.se.financetracker.useraccount.UserAccountService;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin
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
    public ResponseEntity<List<CashFlowDTO>> findCashFlows() throws ResourceNotFoundException {
        List<CashFlowDTO> cashFlowList = this.cashFlowService.findAll();
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
    public ResponseEntity<String> add(@RequestBody CashFlowCreationDTO cashFlowCreationDTO)
            throws ResourceNotFoundException, InvalidRequestParamException, ConstraintViolationException {
        if (cashFlowCreationDTO.getAmount().compareTo(BigDecimal.ZERO) == 0) {
            throw new InvalidRequestParamException("Cash flow amount cannot be 0!");
        }
        if (this.cashFlowService.countCashFlowByDetails(cashFlowCreationDTO.getUserId(),
                cashFlowCreationDTO.getSourceName(), cashFlowCreationDTO.getDate()) > 0) {
            throw new InvalidRequestParamException("Cash flow already exists!");
        }
        UserAccount userAccount = this.userAccountService.findUserAccountByUserId(cashFlowCreationDTO.getUserId());
        if (userAccount == null) {
            throw new InvalidRequestParamException("User Id cannot be found!");
        }
        SubCategory subCategory = this.subCategoryService.findSubCategoryBySubId(cashFlowCreationDTO.getSubId());
        if (subCategory == null) {
            throw new InvalidRequestParamException("Sub-Category Id cannot be found!");
        }
        CashFlow cashFlow = new CashFlow(cashFlowCreationDTO.getSourceName(), cashFlowCreationDTO.getDate(),
                cashFlowCreationDTO.getAmount(), cashFlowCreationDTO.getRemark(), subCategory, userAccount);
        this.cashFlowService.add(cashFlow);
        return ResponseEntity.ok().body("Add successful!");
    }

    @PostMapping("/update")
    public ResponseEntity<String> update(@RequestBody CashFlowUpdateDTO cashFlowUpdateDTO)
            throws ResourceNotFoundException, InvalidRequestParamException, ConstraintViolationException {
        if (cashFlowUpdateDTO.getAmount().compareTo(BigDecimal.ZERO) == 0) {
            throw new InvalidRequestParamException("Cash flow amount cannot be 0!");
        }
        CashFlow currCashFlow = this.cashFlowService.findCashFlowByFlow_Id(cashFlowUpdateDTO.getFlowId());
        if (currCashFlow == null) {
            throw new ResourceNotFoundException("Cash flow not found!");
        }
        if (this.cashFlowService.countCashFlowByDetails(currCashFlow.getUserAccount().getUserId(),
                cashFlowUpdateDTO.getSourceName(), cashFlowUpdateDTO.getDate()) > 0) {
            throw new InvalidRequestParamException("Cash flow already exists!");
        }
        SubCategory newSubCategory = this.subCategoryService.findSubCategoryBySubId(cashFlowUpdateDTO.getSubId());
        if (newSubCategory == null) {
            throw new InvalidRequestParamException("Sub-Category Id cannot be found!");
        }
        currCashFlow.setSourceName(cashFlowUpdateDTO.getSourceName());
        currCashFlow.setDate(cashFlowUpdateDTO.getDate());
        currCashFlow.setAmount(cashFlowUpdateDTO.getAmount());
        currCashFlow.setRemark(cashFlowUpdateDTO.getRemark());
        currCashFlow.setSubCategory(newSubCategory);
        this.cashFlowService.add(currCashFlow);
        return ResponseEntity.ok().body("Update successful!");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam("id") Integer flowId)
            throws ResourceNotFoundException, InvalidRequestParamException, ConstraintViolationException {
        CashFlow cashFlow = this.cashFlowService.findCashFlowByFlow_Id(flowId);
        if (cashFlow == null) {
            throw new ResourceNotFoundException("Cash flow not found!");
        }
        this.cashFlowService.delete(cashFlow);
        return ResponseEntity.ok().body("Delete successful!");
    }
}
