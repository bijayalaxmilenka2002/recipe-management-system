
const express = require('express');
const router = express.Router();


const { addReview, getReviews } = require('../controllers/recipeController');


router.post('/:id/reviews', addReview);

router.get('/:id/reviews', getReviews);

module.exports = router;