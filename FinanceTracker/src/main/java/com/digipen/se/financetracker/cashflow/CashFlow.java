package com.digipen.se.financetracker.cashflow;

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
@NoArgsConstructor
@Entity
@Table(name = "cash_flow")
public class CashFlow {
    @Column(name = "flow_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id private int flowId;
    @NotBlank(message = "Cash flow cannot be blank!")
    @Length(max = 255, message = "Cash flow source name cannot be longer than 255 characters!")
    @Column(name = "source_name")
    private String sourceName;
    @PastOrPresent(message = "Cash flow cannot be in the future!")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    @Column(name = "date")
    private LocalDate date;
    @NotNull(message = "Cash flow amount cannot be null!")
    @Column(name = "amount")
    private BigDecimal amount;
    @Length(max = 255, message = "Cash flow remark cannot be longer than 255 characters!")
    @Column(name = "remark")
    private String remark;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "sub_id", referencedColumnName = "sub_id")
    @Fetch(FetchMode.JOIN)
    private SubCategory subCategory;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    @Fetch(FetchMode.JOIN)
    private UserAccount userAccount;

    public CashFlow(String sourceName, LocalDate date, BigDecimal amount,
                    String remark, SubCategory subCategory, UserAccount userAccount) {
        this.sourceName = sourceName;
        this.date = date;
        this.amount = amount;
        this.remark = remark;
        this.subCategory = subCategory;
        this.userAccount = userAccount;
    }
}
