
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        
        const response = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Registration successful! Please login.');
            window.location.href = 'login.html'; 
        } else {
            alert(data.message || 'Registration failed.'); 
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Server error. Is your Node.js server running?');
    }
});