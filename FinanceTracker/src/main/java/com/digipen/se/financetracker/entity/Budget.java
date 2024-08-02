package com.digipen.se.financetracker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@Entity
@Table(name = "budget")
public class Budget {
    @Column(name = "budget_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id private int budgetId;
    @Positive
    @Column(name = "year")
    private int year;
    @Positive
    @Column(name = "month")
    private int month;
    @NotNull
    @Column(name = "amount")
    private BigDecimal amount;
    @JsonIgnore
    @ManyToOne
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "cat_id", referencedColumnName = "cat_id")
    private Category category;
    @JsonIgnore
    @ManyToOne
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private UserAccount userAccount;
}
