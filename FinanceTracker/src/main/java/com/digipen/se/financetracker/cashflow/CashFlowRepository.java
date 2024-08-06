package com.digipen.se.financetracker.cashflow;

import com.digipen.se.financetracker.entities.CashFlow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CashFlowRepository extends JpaRepository<CashFlow, Integer> {
    @Query("SELECT f FROM CashFlow f " +
            "WHERE f.userAccount.userId = :userId " +
            "ORDER BY f.date DESC")
    List<CashFlow> findAllByUserAccount_UserIdOrderByDateDesc(@Param("userId") Integer userId);
    @Query("SELECT f FROM CashFlow f " +
            "WHERE f.userAccount.userId = :userId AND YEAR(f.date) = :year " +
            "ORDER BY f.date DESC")
    List<CashFlow> findAllByYearAndUserAccount_UserIdOrderByDateDesc(
            @Param("userId") Integer userId, @Param("year") Integer year);
    @Query("SELECT f FROM CashFlow f " +
            "WHERE f.userAccount.userId = :userId AND YEAR(f.date) = :year AND MONTH(f.date) = :month " +
            "ORDER BY f.date DESC")
    List<CashFlow> findAllByYearAndMonthAndUserAccount_UserIdOrderByDateDesc(
            @Param("userId") Integer userId,@Param("year") Integer year, @Param("month") Integer month);

    @Query("SELECT COUNT(f) FROM CashFlow f " +
            "WHERE LOWER(f.sourceName) = LOWER(:name) AND f.date = :date")
    Long countCashFlowBySourceNameAndDate(@Param("name") String sourceName,
                                          @Param("date") LocalDate date);
}
