
const API_KEY = '3117d5040a1b4a7788f101c4af57e60f'; 
const BASE_URL = 'https://api.spoonacular.com/recipes';


const searchCache = {};
const detailsCache = {};


async function fetchRecipes(params) {
    let url = `${BASE_URL}/complexSearch?apiKey=${API_KEY}&number=12`;

    if (params.query) url += `&query=${params.query}`;
    if (params.cuisine) url += `&cuisine=${params.cuisine}`;
    if (params.mealType) url += `&type=${params.mealType}`;
    if (params.diet) url += `&diet=${params.diet}`;
    if (params.maxTime) url += `&maxReadyTime=${params.maxTime}`;


    if (searchCache[url]) {
        console.log("Serving search results from CACHE! 🚀 (Saved an API call)");
        return searchCache[url]; 
    }

    try {
        console.log("Fetching search results from Spoonacular API... 🌐");
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Failed to fetch from Spoonacular');
        
        const data = await response.json();
        
        
        searchCache[url] = data.results; 
        
        return data.results; 

    } catch (error) {
        console.error("Error in fetchRecipes:", error);
        return null; 
    }
}


async function fetchRecipeDetails(recipeId) {
    

    if (detailsCache[recipeId]) {
        console.log("Serving recipe details from CACHE! 🚀 (Saved an API call)");
        return detailsCache[recipeId]; 
    }

    const url = `${BASE_URL}/${recipeId}/information?apiKey=${API_KEY}`;
    
    try {
        console.log("Fetching recipe details from Spoonacular API");
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Failed to fetch recipe details');
        
        const data = await response.json();

        
        detailsCache[recipeId] = data;

        return data;
    } catch (error) {
        console.error("Error in fetchRecipeDetails:", error);
        return null;
    }
}