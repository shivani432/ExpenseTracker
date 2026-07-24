package com.shivani.expensetracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shivani.expensetracker.entity.Expense;
import com.shivani.expensetracker.exception.ResourceNotFoundException;
import com.shivani.expensetracker.repository.ExpenseRepository;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

      public String getMessage() {
        return "Expense Service is Working!";
  }
    public Expense saveExpense(Expense expense) {
    return expenseRepository.save(expense);
  }
    public List<Expense> getAllExpenses() {
    return expenseRepository.findAll();
  }
    public Expense getExpenseById(Long id) {
    return expenseRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));
  }
    public Expense updateExpense(Long id, Expense updatedExpense) {

   Expense expense = expenseRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));
    
        expense.setName(updatedExpense.getName());
        expense.setType(updatedExpense.getType());
        expense.setAmount(updatedExpense.getAmount());
        expense.setCategory(updatedExpense.getCategory());
        expense.setDate(updatedExpense.getDate());

        return expenseRepository.save(expense);
    
  }
    public void deleteExpense(Long id) {

    Expense expense = expenseRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));

    expenseRepository.delete(expense);
}
}
