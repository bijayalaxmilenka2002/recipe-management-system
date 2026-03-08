
const db = require('../config/db');

const addReview = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const { rating, reviewText } = req.body;

        const sqlQuery = 'INSERT INTO reviews (recipe_id, rating, review_text) VALUES (?, ?, ?)';
        await db.execute(sqlQuery, [recipeId, rating, reviewText]);

        res.status(201).json({ message: 'Review added successfully!' });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: 'Failed to add review to the database.' });
    }
};


const getReviews = async (req, res) => {
    try {
        const recipeId = req.params.id;
        
        const sqlQuery = 'SELECT * FROM reviews WHERE recipe_id = ? ORDER BY created_at DESC';
        const [reviews] = await db.execute(sqlQuery, [recipeId]);
        
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: 'Failed to fetch reviews.' });
    }
};

module.exports = { addReview, getReviews };