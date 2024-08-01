package com.digipen.se.financetracker.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@Table(name = "cash_flow")
public class CashFlow {
    @Column(name = "flow_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id private int Id;
    @NotBlank
    @Max(255)
    @Column(name = "source_name")
    private String sourceName;
    @PastOrPresent
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    @Column(name = "date")
    private LocalDate date;
    @Column(name = "amount")
    private BigDecimal amount;
    @Max(255)
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
}
