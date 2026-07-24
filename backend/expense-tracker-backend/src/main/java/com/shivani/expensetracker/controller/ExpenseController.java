package com.shivani.expensetracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shivani.expensetracker.entity.Expense;
import com.shivani.expensetracker.service.ExpenseService;

import jakarta.validation.Valid;

@RestController
@RequestMapping
public class ExpenseController {

        @Autowired
        private ExpenseService expenseService;

        @GetMapping("/")
        public String home() {
            return expenseService.getMessage();
    }
        @PostMapping("/expenses")
       public Expense saveExpense(@Valid @RequestBody Expense expense) {
        return expenseService.saveExpense(expense);
    }
        @GetMapping("/expenses")
        public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }
        @GetMapping("/expenses/{id}")
        public Expense getExpenseById(@PathVariable Long id) {
        return expenseService.getExpenseById(id);
    }
       @PutMapping("/expenses/{id}")
       public Expense updateExpense(@PathVariable Long id,
                             @Valid @RequestBody Expense updatedExpense) {

    return expenseService.updateExpense(id, updatedExpense);
}
        @DeleteMapping("/expenses/{id}")
        public void deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
    }

}