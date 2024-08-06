package com.digipen.se.financetracker.pojo;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserAddDTO {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String gender;
}
