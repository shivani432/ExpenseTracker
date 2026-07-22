const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");

// Income, Expense, Balance
const totalIncomeElement = document.getElementById("totalIncome");
const totalExpenseElement = document.getElementById("totalExpense");
const balanceElement = document.getElementById("balance");

// Search Input
const searchExpense = document.getElementById("searchExpense");

// Category
const expenseCategory = document.getElementById("expenseCategory");

// Date
const expenseDate = document.getElementById("expenseDate");

// Transaction Type
const transactionType = document.getElementById("transactionType");

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

    // Get Search Text
    const searchText = searchExpense.value.toLowerCase();
    const selectedType = filterType.value;
   
     let totalIncome = 0;
    let totalExpense = 0;
    let balance = 0;

    
  const filteredExpenses = expenses.filter(function(expense){

    const matchesSearch = expense.name
        .toLowerCase()
        .includes(searchText);

    const matchesType =
        selectedType === "All" ||
        expense.type === selectedType;

    return matchesSearch && matchesType;

});
// Display Filtered Expenses
filteredExpenses.forEach(function(expense, index){

   if (expense.type === "Income") {

    totalIncome += expense.amount;

} else {

    totalExpense += expense.amount;

}

balance = totalIncome - totalExpense;

    const li = document.createElement("li");

li.innerHTML = `
    <strong>${expense.name}</strong>

    <br>

    ${expense.type === "Income" ? "🟢 Income" : "🔴 Expense"}

    - ₹${expense.amount}

    <br>

    📂 Category : ${expense.category}

    <br>

    📅 Date : ${expense.date}

    <br><br>

    <button onclick="editExpense(${expenses.indexOf(expense)})">
        Edit
    </button>

    <button onclick="deleteExpense(${expenses.indexOf(expense)})">
        Delete
    </button>
`;

    expenseList.appendChild(li);

});

totalIncomeElement.textContent = totalIncome;

totalExpenseElement.textContent = totalExpense;

balanceElement.textContent = balance;

}

// Add Expense
function addExpense() {

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);
    // Get Category
    const category = expenseCategory.value;

    // Get Date
    const date = expenseDate.value;
    // Get Transaction Type
    const type = transactionType.value;

    if (
    name === "" ||
    amount <= 0 ||
    date === ""
) {
    alert("Please fill all fields.");
    return;
}

   const expense = {
    name: name,
    amount: amount,
    category: category,
    date: date,
    type: type
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
    expenseCategory.value = "";
    expenseDate.value = "";

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

searchExpense.addEventListener("input", function () {
    renderExpenses();
});

filterType.addEventListener("change", function () {

    renderExpenses();

});