package com.shivani.expensetracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shivani.expensetracker.entity.Expense;
import com.shivani.expensetracker.entity.User;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUser(User user);
}
