const express = require('express');
const serverless = require('serverless-http');
var cors = require('cors');

// Routes
const ingredientsRoutes = require('../Routes/ingredients.mongodb');

require('../Db');
const app = express();
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/.netlify/functions/app', ingredientsRoutes);

module.exports = app;
module.exports.handler = serverless(app);