
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'krishna@123', 
    database: 'recipe_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();


promisePool.getConnection()
    .then(connection => {
        console.log('Successfully connected to the MySQL recipe_db database!');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to MySQL database:', err);
    });

module.exports = promisePool;