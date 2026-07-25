package com.shivani.expensetracker.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shivani.expensetracker.entity.Expense;
import com.shivani.expensetracker.entity.User;
import com.shivani.expensetracker.exception.ResourceNotFoundException;
import com.shivani.expensetracker.repository.ExpenseRepository;
import com.shivani.expensetracker.repository.UserRepository;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

      public String getMessage() {
        return "Expense Service is Working!";
  }
    public Expense saveExpense(Expense expense) {

    if (expense.getUser() != null && expense.getUser().getEmail() != null) {

        User user = userRepository.findByEmail(expense.getUser().getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        expense.setUser(user);
    }

    return expenseRepository.save(expense);
}
    public List<Expense> getAllExpenses() {
    return expenseRepository.findAll();
  }
  
  public List<Expense> getExpensesByUser(Long userId) {

    User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    return expenseRepository.findByUser(user);
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
public Object getExpenseSummary(Long userId) {
    List<Expense> expenses = getExpensesByUser(userId);

double totalIncome = 0;
double totalExpense = 0;

for (Expense expense : expenses) {

    if (expense.getType().equalsIgnoreCase("Income")) {
        totalIncome += expense.getAmount();
    } else {
        totalExpense += expense.getAmount();
    }
}

double balance = totalIncome - totalExpense;

Map<String, Object> summary = new HashMap<>();

summary.put("totalIncome", totalIncome);
summary.put("totalExpense", totalExpense);
summary.put("balance", balance);
summary.put("totalTransactions", expenses.size());

return summary;
}
}
