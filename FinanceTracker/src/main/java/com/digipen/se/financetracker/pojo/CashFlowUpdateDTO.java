package com.digipen.se.financetracker.pojo;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CashFlowUpdateDTO {
    private int flowId;
    private String sourceName;
    private LocalDate date;
    private BigDecimal amount;
    private String remark;
    private int subId;
}
