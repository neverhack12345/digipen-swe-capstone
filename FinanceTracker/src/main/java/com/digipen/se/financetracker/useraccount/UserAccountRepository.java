package com.digipen.se.financetracker.useraccount;

import com.digipen.se.financetracker.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Integer> {
    @Query("SELECT u FROM UserAccount u WHERE u.userId = :userId")
    UserAccount findUserAccountByUserId(@Param("userId") Integer userId);

    @Query("SELECT COUNT(u) FROM UserAccount u WHERE LOWER(u.email) = LOWER(:email)")
    Long countUserAccountByEmail(@Param("email") String email);

    @Query("SELECT u.password FROM UserAccount u WHERE u.email = :email")
    String getPasswordByEmail(@Param("email") String email);
}
