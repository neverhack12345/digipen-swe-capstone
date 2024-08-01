package com.digipen.se.financetracker.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "user_account")
public class UserAccount {
    public enum GENDER {M, F};
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id private int Id;
    @NotBlank
    @Email
    @Max(255)
    @Column(name = "email")
    private String email;
    @NotBlank
    @Max(255)
    @Column(name = "password")
    private String password;
    @NotBlank
    @Max(255)
    @Column(name = "first_name")
    private String firstName;
    @NotBlank
    @Max(255)
    @Column(name = "last_name")
    private String lastName;
    @PastOrPresent
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    @Column(name = "dob")
    private LocalDate dob;
    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private GENDER gender;
    @JsonIgnore
    @OneToMany(mappedBy = "userAccount")
    @Fetch(FetchMode.SELECT)
    private List<Budget> budgetList;
    @JsonIgnore
    @OneToMany(mappedBy = "userAccount")
    @Fetch(FetchMode.SELECT)
    private List<CashFlow> CashFlow;
}
