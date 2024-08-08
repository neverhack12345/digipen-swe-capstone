package com.digipen.se.financetracker.useraccount;

import com.digipen.se.financetracker.exceptions.InvalidRequestParamException;
import com.digipen.se.financetracker.exceptions.ResourceNotFoundException;
import com.digipen.se.financetracker.model.UserCreationDTO;
import jakarta.validation.ConstraintViolationException;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserAccountController {
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserAccountService userAccountService;

    public UserAccountController(UserAccountService userAccountService,
                                 BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userAccountService = userAccountService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
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
    public ResponseEntity<String> add(@RequestBody UserCreationDTO userCreationDTO)
            throws InvalidRequestParamException, ConstraintViolationException {
        if (this.userAccountService.countUserAccountByEmail(userCreationDTO.getEmail()) > 0) {
            throw new InvalidRequestParamException("User email already exists!");
        }
        UserAccount userAccount = new UserAccount(
                userCreationDTO.getEmail(), bCryptPasswordEncoder.encode(userCreationDTO.getPassword()),
                userCreationDTO.getFirstName(), userCreationDTO.getLastName(),
                userCreationDTO.getDob(), userCreationDTO.getGender());
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

    @PostMapping("/update")
    public ResponseEntity<String> update(@RequestBody UserAccount userAccount)
            throws InvalidRequestParamException, ConstraintViolationException {
        userAccount.setPassword(bCryptPasswordEncoder.encode(userAccount.getPassword()));
        UserAccount currUser = this.userAccountService.findUserAccountByUserId(userAccount.getUserId());
        if (currUser == null) {
            throw new ResourceNotFoundException("No user matching user id!");
        }
        currUser.replace(userAccount);
        this.userAccountService.add(currUser);
        return ResponseEntity.ok().body("Update successful!");
    }
}
