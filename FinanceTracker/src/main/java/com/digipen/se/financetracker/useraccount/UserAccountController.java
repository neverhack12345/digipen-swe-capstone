package com.digipen.se.financetracker.useraccount;

import com.digipen.se.financetracker.entity.UserAccount;
import com.digipen.se.financetracker.exception.InvalidRequestParamException;
import com.digipen.se.financetracker.exception.ResourceNotFoundException;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserAccountController {
    private final UserAccountService userAccountService;

    public UserAccountController(UserAccountService userAccountService) {
        this.userAccountService = userAccountService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> findAll() {
        List<UserAccount> userAccountList = this.userAccountService.findAll();
        if (userAccountList.isEmpty()) {
            throw new ResourceNotFoundException("No user found!");
        }
        return ResponseEntity.ok().body(userAccountList);
    }

    @GetMapping("/searchById")
    public ResponseEntity<?> findByUserId(@Param("Id") Integer userId)
            throws ResourceNotFoundException, InvalidRequestParamException{
        if (userId < 0) {
            throw new InvalidRequestParamException("Id cannot be less than or equals 0!");
        }
        List<UserAccount> userAccountList = this.userAccountService.findByUserId(userId);
        if (userAccountList.isEmpty()) {
            throw new ResourceNotFoundException("No user found!");
        }
        return ResponseEntity.ok().body(userAccountList);
    }
}
