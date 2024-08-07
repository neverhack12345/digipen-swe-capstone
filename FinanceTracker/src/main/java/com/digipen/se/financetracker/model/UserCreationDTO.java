package com.digipen.se.financetracker.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserCreationDTO {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String gender;
}
