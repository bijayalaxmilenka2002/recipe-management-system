
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();

        if (response.ok) {
            alert('Login successful! Welcome back, ' + data.username);
            
        
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('username', data.username);
            
            window.location.href = 'index.html'; 
        } else {
            alert(data.message || 'Login failed. Check your email and password.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Server error. Is your Node.js server running?');
    }
});