package com.digipen.se.financetracker.useraccount;

import com.digipen.se.financetracker.entity.UserAccount;
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

    public List<UserAccount> findByUserId(Integer userId) {
        return this.userAccountRepository.findByUserId(userId);
    }
}
