const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const total = document.getElementById("total");

let expenses = [];
let totalAmount = 0;

// Store the index of the expense being edited
let editIndex = -1;

// Save data to Local Storage
function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Load data from Local Storage
function loadExpenses() {

    const savedData = localStorage.getItem("expenses");

    if (savedData !== null) {
        expenses = JSON.parse(savedData);
    }

}

// Render all expenses
function renderExpenses() {

    expenseList.innerHTML = "";
    totalAmount = 0;

    expenses.forEach(function (expense, index) {

        const li = document.createElement("li");

        li.innerHTML = `
            ${expense.name} - ₹${expense.amount}

            <button onclick="editExpense(${index})">
                Edit
            </button>

            <button onclick="deleteExpense(${index})">
                Delete
            </button>
        `;

        expenseList.appendChild(li);

        totalAmount += expense.amount;

    });

    total.textContent = totalAmount;

}

// Add Expense
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

    

    // Add New Expense
    if (editIndex === -1) {

        expenses.push(expense);

    } else {

        // Update Existing Expense
        expenses[editIndex] = expense;

        // Exit Edit Mode
        editIndex = -1;

        // Change button text
        addBtn.textContent = "Add Expense";

    }

    // Save Updated Data
    saveToLocalStorage();

    // Clear Input Fields
    expenseName.value = "";
    expenseAmount.value = "";

    // Refresh UI
    renderExpenses();

}

// Edit Expense
function editExpense(index) {

    // Get Selected Expense
    const expense = expenses[index];

    // Fill Input Fields
    expenseName.value = expense.name;
    expenseAmount.value = expense.amount;

    // Store Editing Index
    editIndex = index;

    // Change Button Text
    addBtn.textContent = "Update Expense";

}

// Delete Expense
function deleteExpense(index) {

    expenses.splice(index, 1);

    saveToLocalStorage();

    renderExpenses();

}

// Add Button Event
addBtn.addEventListener("click", function () {

    addExpense();

});

// Initial Load
loadExpenses();

renderExpenses();