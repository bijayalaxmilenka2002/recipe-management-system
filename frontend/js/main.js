

document.addEventListener('DOMContentLoaded', () => {
    
    const searchBtn = document.getElementById('searchBtn');
    const resultsContainer = document.getElementById('recipe-results');

    
    searchBtn.addEventListener('click', async () => {
        
       
        const searchParams = {
            query: document.getElementById('searchInput').value,
            cuisine: document.getElementById('cuisineType').value,
            mealType: document.getElementById('mealType').value,
            diet: document.getElementById('dietaryFilter').value,
            maxTime: document.getElementById('maxTime').value
        };

        
        resultsContainer.innerHTML = '<p>Searching Spoonacular database...</p>';

        try {
            
            const recipes = await fetchRecipes(searchParams);

            
            if (recipes && recipes.length > 0) {
                displayRealRecipes(recipes, resultsContainer);
            } else {
                resultsContainer.innerHTML = '<p>No recipes found. Try changing your filters!</p>';
            }

        } catch (error) {
            console.error("Error during search:", error);
            resultsContainer.innerHTML = '<p>Sorry, there was a problem connecting to the database.</p>';
        }
    });
});


function displayRealRecipes(recipes, container) {
    
    container.innerHTML = '';

    
    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        
        
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" style="width: 100%; border-radius: 4px; margin-bottom: 10px;">
            <h3>${recipe.title}</h3>
            <a href="recipe-details.html?id=${recipe.id}" class="view-recipe-btn">View Full Recipe</a>
        `;
        
        container.appendChild(card);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const guestLinks = document.getElementById('guest-links');
    const userLinks = document.getElementById('user-links');
    const welcomeMessage = document.getElementById('welcome-message');
    const logoutBtn = document.getElementById('logoutBtn');

    
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
        
        if (guestLinks) guestLinks.style.display = 'none';
        if (userLinks) userLinks.style.display = 'inline';
        if (welcomeMessage) welcomeMessage.textContent = `Welcome, ${storedUsername}!`;
    }

   
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault(); 
            
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            
            alert('You have been successfully logged out.');
            
            
            window.location.reload(); 
        });
    }
});