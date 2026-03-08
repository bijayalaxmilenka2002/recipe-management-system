

document.addEventListener('DOMContentLoaded', () => {
    
    const profileForm = document.getElementById('profileForm');

    
    profileForm.addEventListener('submit', async (event) => {
        event.preventDefault();

    
        const userProfile = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            dietaryPreference: document.getElementById('dietary').value,
            allergies: document.getElementById('allergies').value,
            cookingSkill: document.getElementById('skill').value
        };

        try {
        
            const response = await fetch('http://localhost:3000/api/users/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(userProfile) 
            });

            
            const result = await response.json();

            
            if (response.ok) {
                alert('Success: ' + result.message);
                profileForm.reset(); 
            } else {
                
                alert('Error: ' + result.message);
            }

        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Failed to connect to the server. Make sure your Node.js backend is running!');
        }
    });
});