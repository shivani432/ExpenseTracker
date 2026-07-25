const API_URL = "http://localhost:8080/expenses";
const userId = localStorage.getItem("userId");

if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const addBtn = document.getElementById("addBtn");
const exportBtn = document.getElementById("exportBtn");
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
const transactionCount = document.getElementById("transactionCount");
const showingCount = document.getElementById("showingCount");
// Expense Chart
const expenseChart = document.getElementById("expenseChart");
const filterType = document.getElementById("filterType");
const logoutBtn = document.getElementById("logoutBtn");

let expenses = [];

// Chart Variable
let chart;

let totalAmount = 0;

// Store the index of the expense being edited
let editIndex = -1;

// Save data to Local Storage
// Old LocalStorage Function (Not Used Now)
function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

async function loadExpenses() {

    const response = await fetch(API_URL + "/user/" + userId);

    expenses = await response.json();

    const summaryResponse = await fetch(API_URL + "/user/" + userId + "/summary");
    const summary = await summaryResponse.json();

    document.getElementById("totalIncome").innerText = summary.totalIncome;
    document.getElementById("totalExpense").innerText = summary.totalExpense;
    document.getElementById("balance").innerText = summary.balance;
    document.getElementById("transactionCount").innerText = summary.totalTransactions;

    renderExpenses();

}

// Render all expenses
function renderExpenses() {

    expenseList.innerHTML = "";

    // Get Search Text
    const searchText = searchExpense.value.toLowerCase();
    const selectedType = filterType.value;
    const selectedCategory = filterCategory.value;
   
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

    const matchesCategory =
    selectedCategory === "All" ||
    expense.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesType && matchesCategory;

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

// Update Chart
updateChart(totalIncome, totalExpense);

// Total Transactions
transactionCount.textContent = expenses.length;

// Currently Showing Transactions
showingCount.textContent = filteredExpenses.length;

} 

// Create Expense Chart
function updateChart(income, expense) {

    // Remove Old Chart
    if (chart) {
        chart.destroy();
    }

    // Create New Chart
    chart = new Chart(expenseChart, {

        type: "pie",

        data: {

            labels: ["Income", "Expense"],

            datasets: [{

                data: [income, expense],

                backgroundColor: [
                    "green",
                    "red"
                ]

            }]

        }

    });

}



// Add Expense
async function addExpense() {

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
    type: type,
    user: {
    id: Number(userId)
}

};

    console.log(expense);

    if (editIndex === -1) {

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(expense)
    });

} else {

    await fetch(API_URL + "/" + expenses[editIndex].id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(expense)
    });

    editIndex = -1;
    addBtn.textContent = "Add Expense";
}

    // Clear Input Fields
    expenseName.value = "";
    expenseAmount.value = "";
    expenseCategory.value = "";
    expenseDate.value = "";
    await loadExpenses();

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
    expenseCategory.value = expense.category;
    expenseDate.value = expense.date;
    transactionType.value = expense.type;

    // Store Editing Index
    editIndex = index;

    // Change Button Text
    addBtn.textContent = "Update Expense";

}

async function deleteExpense(index) {

    await fetch(API_URL + "/" + expenses[index].id, {
        method: "DELETE"
    });

    await loadExpenses();

}

// Add Button Event
addBtn.addEventListener("click", function () {

    addExpense();

});

exportBtn.addEventListener("click", exportToCSV);

// Initial Load
loadExpenses();

function exportToCSV() {

    let csv = "Name,Amount,Type,Category,Date\n";

    expenses.forEach(expense => {
        csv += `${expense.name},${expense.amount},${expense.type},${expense.category},${expense.date}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "expenses.csv";

    a.click();

    window.URL.revokeObjectURL(url);
}
searchExpense.addEventListener("input", function () {
    renderExpenses();
});

filterType.addEventListener("change", function () {

    renderExpenses();

});

filterCategory.addEventListener("change", function () {
    renderExpenses();
});

logoutBtn.addEventListener("click", function () {

    localStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";

});