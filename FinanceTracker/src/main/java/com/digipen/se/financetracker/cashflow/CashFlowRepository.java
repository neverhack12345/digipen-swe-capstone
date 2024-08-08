package com.digipen.se.financetracker.cashflow;

import com.digipen.se.financetracker.model.CashFlowDTO;
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
            "WHERE f.userAccount.userId = :userId AND LOWER(f.sourceName) = LOWER(:name) AND f.date = :date")
    Long countCashFlowByUserAccount_UserIdSourceNameAndDate(@Param("userId") Integer userId,
            @Param("name") String sourceName, @Param("date") LocalDate date);

    @Query("SELECT NEW com.digipen.se.financetracker.model.CashFlowDTO(" +
            "f.flowId, f.sourceName, f.date, f.amount, f.remark, f.subCategory.subId, " +
            "f.subCategory.subName, f.userAccount.userId) FROM CashFlow f")
    List<CashFlowDTO> findCashFlowDTO();
}
