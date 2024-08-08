package com.digipen.se.financetracker.budget;

import com.digipen.se.financetracker.model.BudgetDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Integer> {
    @Query("SELECT b from Budget b " +
            "WHERE b.userAccount.userId = :userId " +
            "ORDER BY b.month, b.year DESC")
    List<Budget> findAllByUserAccount_UserIdOrderByMonthYearDesc(@Param("userId") Integer userId);
    @Query("SELECT b from Budget b " +
            "WHERE b.year = :year AND b.userAccount.userId = :userId " +
            "ORDER BY b.month, b.year DESC")
    List<Budget> findAllByYearAndUserAccount_UserIdOrderByMonthYearDesc(
            @Param("userId") Integer userId,
            @Param("year") Integer year);
    @Query("SELECT b from Budget b " +
            "WHERE b.year = :year AND b.month = :month AND b.userAccount.userId = :userId " +
            "ORDER BY b.month, b.year DESC")
    List<Budget> findAllByYearAndMonthAndUserAccount_UserIdOrderByMonthYearDesc(
            @Param("userId") Integer userId,
            @Param("year") Integer year,
            @Param("month") Integer month);

    @Query("SELECT COUNT(b) " +
            "FROM Budget b " +
            "WHERE b.userAccount.userId = :userId AND b.category.catId = :catId " +
            "AND b.year = :year AND b.month = :month")
    Long CountBudgetByUserAccount_UserIdAndCategory_CategoryIdAndYearAndMonth(
            @Param("userId") Integer userId, @Param("catId") Integer catId,
            @Param("year") Integer year, @Param("month") Integer month);

    @Query("SELECT NEW com.digipen.se.financetracker.model.BudgetDTO(" +
            "b.budgetId, b.year, b.month, b.amount, b.category.catId, " +
            "b.category.catName, b.userAccount.userId) FROM Budget b")
    List<BudgetDTO> findBudgetDTO();
}
