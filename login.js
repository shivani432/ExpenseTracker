const loginBtn = document.getElementById("addBtn");

loginBtn.addEventListener("click", loginUser);


    async function loginUser() {
   try{     

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    const user = await response.json();


    if (user) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userId", user.id);
        alert("Login Successful");
        window.location.href = "index.html";
        
    } else {
        alert("Invalid Email or Password");
    }
}
    catch (error) {
   alert("Invalid email or password. If you don't have an account, please register first.");
   console.log(error);
}
}