
const db = require('../config/db');
const bcrypt = require('bcryptjs'); 

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const [existingUsers] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'User with this email already exists!' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sqlQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        await db.execute(sqlQuery, [username, email, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

    
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const user = users[0]; 

    
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

    
        res.status(200).json({ 
            message: 'Login successful!', 
            userId: user.id,
            username: user.username 
        });

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: 'Server error during login.' });
    }
};

module.exports = { registerUser, loginUser };