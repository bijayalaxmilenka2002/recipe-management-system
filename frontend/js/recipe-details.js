

document.addEventListener('DOMContentLoaded', async () => {
    
   
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    const contentContainer = document.getElementById('recipe-content');

    if (!recipeId) {
        contentContainer.innerHTML = '<p>No recipe selected.</p>';
        return;
    }

   
    const recipe = await fetchRecipeDetails(recipeId);

    if (recipe) {
        const ingredientsHTML = recipe.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join('');
        contentContainer.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-header-img">
            
            <div class="recipe-meta">
                <span>⏱ <strong>Time:</strong> ${recipe.readyInMinutes} mins</span>
                <span>🍽 <strong>Servings:</strong> ${recipe.servings}</span>
                <span id="average-rating">&star; <strong>Rating:</strong> Loading...</span>
            </div>
            
            <h3>Ingredients</h3>
            <ul>${ingredientsHTML}</ul>
            
            <h3>Instructions</h3>
            <p>${recipe.instructions || "No instructions are available for this recipe."}</p>
        `;
    } else {
        contentContainer.innerHTML = '<p>Error loading recipe details.</p>';
        return; 
    }

    
    const reviewsList = document.getElementById('reviews-list');
    
    
    async function loadReviews() {
        try {
            
            const response = await fetch(`http://localhost:3000/api/recipes/${recipeId}/reviews`);
            const reviews = await response.json();
            
           
            reviewsList.innerHTML = '<h4>Community Reviews</h4>';
            
            
            if (reviews.length === 0) {
                reviewsList.innerHTML += '<p>No reviews yet. Be the first to review!</p>';
                document.getElementById('average-rating').innerHTML = '&star;<strong>Rating:</strong> No ratings yet';
                return;
            }

            
            let totalRating = 0;
            
            reviews.forEach(review => {
                totalRating += review.rating; 
                
                
                const reviewCard = document.createElement('div');
                reviewCard.className = 'review-card';
                reviewCard.innerHTML = `
                    <p><strong>Rating:</strong> ${review.rating}/5 Stars &star;</p>
                    <p>${review.review_text}</p>
                `;
                reviewsList.appendChild(reviewCard);
            });

            
            const avgRating = (totalRating / reviews.length).toFixed(1);
            document.getElementById('average-rating').innerHTML = `&star; <strong>Rating:</strong> ${avgRating} / 5`;

        } catch (error) {
            console.error("Error loading reviews:", error);
            reviewsList.innerHTML += '<p>Failed to load reviews from database.</p>';
        }
    }

   
    loadReviews();

    
    const reviewForm = document.getElementById('reviewForm');

    reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        
        const rating = document.getElementById('rating').value;
        const text = document.getElementById('reviewText').value;

        try {
            
            const response = await fetch(`http://localhost:3000/api/recipes/${recipeId}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating: rating, reviewText: text })
            });

            if (response.ok) {
                alert('Review submitted successfully!');
                reviewForm.reset(); 

                loadReviews(); 
            } else {
                alert('Failed to submit review.');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Server error. Make sure your Node backend is running!');
        }
    });
});