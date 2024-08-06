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
import org.hibernate.validator.constraints.Length;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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
    @NotBlank(message = "User last name cannot be blank!")
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
    @OneToMany(mappedBy = "userAccount")
    @Fetch(FetchMode.SELECT)
    private List<Budget> budgetList;
    @JsonIgnore
    @OneToMany(mappedBy = "userAccount")
    @Fetch(FetchMode.SELECT)
    private List<CashFlow> CashFlow;

    @JsonIgnore
    public void setUserId(int userId) {
        this.userId = userId;
    }
    public void hashPassword() {
        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        this.password = bcrypt.encode(this.password);
    }
}
