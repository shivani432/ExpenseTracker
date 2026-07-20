const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const total = document.getElementById("total");

let totalAmount = 0;

addBtn.addEventListener("click", function () {

    const name = expenseName.value;
    const amount = Number(expenseAmount.value);

    if (name === "" || amount <= 0) {
        alert("Please enter valid expense.");
        return;
    }

   const li = document.createElement("li");

const deleteBtn = document.createElement("button");

deleteBtn.textContent = "Delete";

li.textContent = `${name} - ₹${amount} `;

li.appendChild(deleteBtn);

//**** */
deleteBtn.addEventListener("click", function () {

    totalAmount -= amount;

    total.textContent = totalAmount;

    li.remove();

});

    expenseList.appendChild(li);
    localStorage.setItem("expenses", expenseList.innerHTML);

    totalAmount += amount;
    total.textContent = totalAmount;

    expenseName.value = "";
    expenseAmount.value = "";

});

window.onload = function () {
    expenseList.innerHTML = localStorage.getItem("expenses") || "";
};