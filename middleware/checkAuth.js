const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        if (token && token !== null) {
            jwt.verify(token, process.env.SECRET_KEY);
            next();

        } else {
            res.status(401).json({
                message: "Auth failed",
                error: err
            });
        }
    } catch( err ){
        res.status(401).json({
            message: "Auth failed",
            error: err
        });
    }
};