package com.digipen.se.financetracker.model;

import com.digipen.se.financetracker.category.SubCategory;
import com.digipen.se.financetracker.useraccount.UserAccount;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.validator.constraints.Length;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CashFlowDTO {
    private int flowId;
    private String sourceName;
    private LocalDate date;
    private BigDecimal amount;
    private String remark;
    private int subId;
    private String subName;
    private int userId;

    public CashFlowDTO(int flowId, String sourceName, LocalDate date, BigDecimal amount,
                       String remark, int subId, String subName, int userId) {
        this.flowId = flowId;
        this.sourceName = sourceName;
        this.date = date;
        this.amount = amount;
        this.remark = remark;
        this.subId = subId;
        this.subName = subName;
        this.userId = userId;
    }
}
