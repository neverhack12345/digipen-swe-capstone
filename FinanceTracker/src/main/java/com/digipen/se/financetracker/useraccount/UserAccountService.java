package com.digipen.se.financetracker.useraccount;

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
        this.userAccountRepository.save(userAccount);
    }

    public Integer authenticate(String email, String password) {
        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        UserAccount user = this.userAccountRepository.getUserAccountByEmail(email);
        if (bcrypt.matches(password, user.getPassword())) {
            return user.getUserId();
        }
        return null;
    }
}
