// const mysql = require("mysql");
// const dotenv = require('dotenv');
// dotenv.config();

// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
// })

// connection.connect( err => {
//     let message = !err ? 'connected' : 'connection Failed';
//     console.log(`MySQL : ${message}`)
// })

// module.exports = connection;

const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect(
    `mongodb://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_USER_PASSWORD}${process.env.DATABASE_URI}`,
    // 'mongodb://localhost:27017/Ingredient',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then( () => {
    console.log("MongoDB Successfully Connected.");
})
.catch( err => {
    console.log("Error in DB connection: " + err);
})