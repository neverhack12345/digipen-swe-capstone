package com.digipen.se.financetracker.useraccount;

import com.digipen.se.financetracker.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Integer> {
    @Query("SELECT u FROM UserAccount u WHERE u.userId = :userId")
    List<UserAccount> findByUserId(@Param("userId") Integer userId);
}
