package com.digipen.se.financetracker.useraccount;

import com.digipen.se.financetracker.entity.UserAccount;
import jakarta.validation.Valid;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAccountService {
    private final UserAccountRepository userAccountRepository;

    public UserAccountService(UserAccountRepository userAccountRepository) {
        this.userAccountRepository = userAccountRepository;
    }

    public List<UserAccount> findAll() {
        return this.userAccountRepository.findAll();
    }

    public UserAccount findUserAccountByUserId(Integer userId) {
        return this.userAccountRepository.findUserAccountByUserId(userId);
    }

    public Long countUserAccountByEmail(String email) {
        return this.userAccountRepository.countUserAccountByEmail(email);
    }

    public void add(@Valid UserAccount userAccount) {
        userAccount.hashPassword();
        this.userAccountRepository.save(userAccount);
    }

    public boolean authenticate(String email, String password) {
        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        String passwordHash = this.userAccountRepository.getPasswordByEmail(email);
        return bcrypt.matches(password, passwordHash);
    }
}
