const users = {};
let currentUser = null;

const balance = {};

// Register functionality
document.getElementById("register-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;

  if (users[username]) {
    alert("Username already exists.");
  } else {
    users[username] = password;
    balance[username] = 1000; // Default balance
    alert("Registration successful! You can now log in.");
    switchToLogin();
  }
});

// Login functionality
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (users[username] && users[username] === password) {
    currentUser = username;
    document.getElementById("user-display").textContent = username;
    document.getElementById("balance").textContent = balance[username].toFixed(2);
    switchToDashboard();
  } else {
    alert("Invalid username or password.");
  }
});

// Transfer functionality
document.getElementById("transfer-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const recipient = document.getElementById("recipient").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (users[recipient] && amount > 0 && amount <= balance[currentUser]) {
    balance[currentUser] -= amount;
    balance[recipient] += amount;
    document.getElementById("balance").textContent = balance[currentUser].toFixed(2);
    document.getElementById("transfer-status").textContent = "Transfer successful!";
  } else {
    document.getElementById("transfer-status").textContent = "Transfer failed.";
  }
});

// Loan functionality
document.getElementById("loan-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const loanAmount = parseFloat(document.getElementById("loan-amount").value);

  if (loanAmount > 0) {
    balance[currentUser] += loanAmount;
    document.getElementById("balance").textContent = balance[currentUser].toFixed(2);
    document.getElementById("loan-status").textContent = "Loan approved!";
  } else {
    document.getElementById("loan-status").textContent = "Invalid loan amount.";
  }
});

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  currentUser = null;
  switchToLogin();
});

// UI Switch Functions
function switchToLogin() {
  document.getElementById("login-section").style.display = "block";
  document.getElementById("register-section").style.display = "none";
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("transfer").style.display = "none";
  document.getElementById("loan").style.display = "none";
}

function switchToDashboard() {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("register-section").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  document.getElementById("transfer").style.display = "block";
  document.getElementById("loan").style.display = "block";
}

// Switch to register page
document.getElementById("register-link").addEventListener("click", () => {