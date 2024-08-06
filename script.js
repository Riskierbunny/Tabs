document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;
    const correctPassword = 'yourpassword'; // Replace with your actual password

    if (password === correctPassword) {
        window.location.href = 'protected.html';
    } else {
        alert('Incorrect password. Please try again.');
    }
});
