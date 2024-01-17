async function fetchUserData() {
  try {
    const response = await fetch('users.json');
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return [];
  }
}

async function login(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const users = await fetchUserData();
  
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    window.location.href = '../Account/pages/dashboard/dashboard.html?loginSuccess=true';
  } else {
    alert('Invalid credentials. Please try again.');
  }
}

document.getElementById('login-form').addEventListener('submit', login);

// login success
var urlParams = new URLSearchParams(window.location.search);
var loginSuccess = urlParams.get('loginSuccess');

// Check if the login was successful and hasn't been shown already during this session
if (loginSuccess === 'true' && !sessionStorage.getItem('loginSuccessShown')) {
  showSuccessAlert();
  sessionStorage.setItem('loginSuccessShown', 'true'); // Mark as shown
}

function showSuccessAlert() {
  alert('Login successful!');
}

// logout logic
function confirmLogout() {
  var isConfirmed = confirm("Are you sure you want to logout?");

  if (isConfirmed) {
    // User clicked "OK" in the confirmation dialog
    logout();
  } else {
    // Handle cancellation
  }
}

function logout() {
  window.location.href = '/auth/login.html';
}
