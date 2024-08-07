package com.digipen.se.financetracker.useraccount;

import com.digipen.se.financetracker.budget.Budget;
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
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "user_account")
public class UserAccount {
    public enum GENDER {M, F, O};
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id private int userId;
    @NotBlank(message = "User email cannot be blank!")
    @Email(message = "User email invalid format!")
    @Length(max = 255, message = "User email cannot be longer than 255 characters!")
    @Column(name = "email")
    private String email;
    @NotBlank(message = "User password cannot be blank!")
    @Length(max = 255, message = "User password cannot be longer than 255 characters!")
    @Column(name = "password")
    private String password;
    @NotBlank(message = "User first name cannot be blank!")
    @Length(max = 255, message = "User first name cannot be longer than 255 characters!")
    @Column(name = "first_name")
    private String firstName;
    @Length(max = 255, message = "User last name cannot be longer than 255 characters!")
    @Column(name = "last_name")
    private String lastName;
    @FutureOrPresent(message = "User date of birth cannot be in the future")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    @Column(name = "dob")
    private LocalDate dob;
    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private GENDER gender;
    @JsonIgnore
    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private LocalDateTime createdAt;
    @JsonIgnore
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @JsonIgnore
    @OneToMany(mappedBy = "userAccount")
    @Fetch(FetchMode.SELECT)
    private List<Budget> budgetList;
    @JsonIgnore
    @OneToMany(mappedBy = "userAccount")
    @Fetch(FetchMode.SELECT)
    private List<com.digipen.se.financetracker.cashflow.CashFlow> CashFlow;

    public UserAccount(String email, String password, String firstName,
                       String lastName, LocalDate dob, String gender) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        if (!lastName.isBlank()) {
            this.lastName = lastName;
        }
        this.dob = dob;
        switch (gender.toUpperCase()) {
            case "M" -> this.gender = GENDER.M;
            case "F" -> this.gender = GENDER.F;
            default -> this.gender = GENDER.O;
        }
    }

    public void replace(UserAccount userAccount) {
        this.email = userAccount.getEmail();
        this.password = userAccount.getPassword();
        this.firstName = userAccount.getFirstName();
        this.lastName = userAccount.getLastName();
        this.dob = userAccount.getDob();
        this.gender = userAccount.getGender();
    }
}
