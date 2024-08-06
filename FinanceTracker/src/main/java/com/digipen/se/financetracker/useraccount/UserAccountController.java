package com.digipen.se.financetracker.useraccount;

import com.digipen.se.financetracker.entity.UserAccount;
import com.digipen.se.financetracker.exception.InvalidRequestParamException;
import com.digipen.se.financetracker.exception.ResourceNotFoundException;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserAccountController {
    private final UserAccountService userAccountService;

    public UserAccountController(UserAccountService userAccountService) {
        this.userAccountService = userAccountService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> findUserAccounts() {
        List<UserAccount> userAccountList = this.userAccountService.findAll();
        if (userAccountList.isEmpty()) {
            throw new ResourceNotFoundException("No user found!");
        }
        return ResponseEntity.ok().body(userAccountList);
    }

    @GetMapping("/searchById")
    public ResponseEntity<UserAccount> findByUserId(@Param("Id") Integer userId)
            throws ResourceNotFoundException, InvalidRequestParamException{
        if (userId < 0) {
            throw new InvalidRequestParamException("Id cannot be less than or equals 0!");
        }
        UserAccount userAccountList = this.userAccountService.findUserAccountByUserId(userId);
        if (userAccountList == null) {
            throw new ResourceNotFoundException("No user found!");
        }
        return ResponseEntity.ok().body(userAccountList);
    }

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody @Valid UserAccount userAccount)
            throws InvalidRequestParamException, ConstraintViolationException {
        if (this.userAccountService.countUserAccountByEmail(userAccount.getEmail()) > 0) {
            throw new InvalidRequestParamException("User email already exists!");
        }
        this.userAccountService.add(userAccount);
        return ResponseEntity.ok().body("Add successful!");
    }

    @GetMapping("/authenticate")
    public ResponseEntity<String> authenticate(
            @Param("email") String email, @Param("password") String password)
            throws ResourceNotFoundException, InvalidRequestParamException, ConstraintViolationException {
        if (this.userAccountService.authenticate(email, password)) {
            return ResponseEntity.ok().body("Authentication success!");
        } else {
            return ResponseEntity.ok().body("Authentication fail!");
        }
    }
}
