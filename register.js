const registerBtn = document.getElementById("addBtn");

registerBtn.addEventListener("click", registerUser);

async function registerUser() {

    try {

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const response = await fetch("http://localhost:8080/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        if (response.ok) {
            alert("Registration Successful");
            window.location.href = "login.html";
        } else {
            alert("Registration Failed");
        }

    } catch (error) {
        alert("Server Error");
        console.log(error);
    }
}