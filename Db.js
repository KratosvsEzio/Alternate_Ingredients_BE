const mysql = require("mysql");
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

connection.connect( err => {
    let message = !err ? 'connected' : 'connection Failed';
    console.log(`MySQL : ${message}`)
})

module.exports = connection;