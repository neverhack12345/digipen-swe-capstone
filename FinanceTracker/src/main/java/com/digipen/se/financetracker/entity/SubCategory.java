package com.digipen.se.financetracker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "sub_category")
public class SubCategory {
    @Column(name = "sub_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id private int subId;
    @NotBlank
    @Max(255)
    @Column(name = "sub_name")
    private String subName;
    @JsonIgnore
    @ManyToOne
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "cat_id", referencedColumnName = "cat_id")
    private Category category;
    @JsonIgnore
    @OneToMany(mappedBy = "subCategory")
    @Fetch(FetchMode.SELECT)
    private List<CashFlow> cashFlowList;
}
