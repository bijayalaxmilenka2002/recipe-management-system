
const express = require('express');
const cors = require('cors');
const db = require('./config/db'); 

const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes'); 

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json()); 

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes); 

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend server is running successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});