package com.digipen.se.financetracker.model;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CashFlowCreationDTO {
    private int userId;
    private String sourceName;
    private LocalDate date;
    private BigDecimal amount;
    private String remark;
    private int subId;
}
