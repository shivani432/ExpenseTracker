// ==============================
// DOM Elements
// ==============================

const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const total = document.getElementById("total");

// ==============================
// Variables
// ==============================

let expenses = [];
let totalAmount = 0;

// ==============================
// Save Data to Local Storage
// ==============================

function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// ==============================
// Load Data from Local Storage
// ==============================

function loadExpenses() {

    const savedData = localStorage.getItem("expenses");

    if (savedData !== null) {
        expenses = JSON.parse(savedData);
    }

}

// ==============================
// Render Expenses
// ==============================

function renderExpenses() {

    expenseList.innerHTML = "";
    totalAmount = 0;

    expenses.forEach(function (expense, index) {

        const li = document.createElement("li");

        li.innerHTML = `
            ${expense.name} - ₹${expense.amount}
            <button onclick="deleteExpense(${index})">
                Delete
            </button>
        `;

        expenseList.appendChild(li);

        totalAmount += expense.amount;

    });

    total.textContent = totalAmount;

}

// ==============================
// Add Expense
// ==============================

function addExpense() {

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);

    if (name === "" || amount <= 0) {
        alert("Please enter valid expense and amount.");
        return;
    }

    const expense = {
        name: name,
        amount: amount
    };

    expenses.push(expense);

    saveToLocalStorage();

    renderExpenses();

    expenseName.value = "";
    expenseAmount.value = "";
}

// ==============================
// Delete Expense
// ==============================

function deleteExpense(index) {

    expenses.splice(index, 1);

    saveToLocalStorage();

    renderExpenses();

}

// ==============================
// Add Button Event
// ==============================

addBtn.addEventListener("click", function () {

    addExpense();

});

// ==============================
// Initial Load
// ==============================

loadExpenses();

renderExpenses();