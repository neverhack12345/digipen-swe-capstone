package com.digipen.se.financetracker.pojo;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CashFlowAddDTO {
    private String sourceName;
    private LocalDate date;
    private BigDecimal amount;
    private String remark;
    private int subId;
    private int userId;
}
