const { cloudinary } = require('../cloudinary');
const express = require('express');
const routes = express.Router();
const connection = require('../Db');

// Fetch Ingredient data Route
routes.get("/:ingredient", (req, res, next) => {

    // console.log('Resppnse', req.params.ingredient);

    connection.query(`SELECT * FROM ingredient WHERE ingredient = '${req.params.ingredient}'`, function (err, result, fields) {
        if (err) throw err;
        //Return the result object:
        // console.log(result);

        res.status(200).json({
          message: "ingredients fetched successfully!",
          data: result
        });
    });

});

// Add New Ingredient data Route
routes.post("", async (req, res, next) => {
        
    // Store Images on cloud server and then store that url in database

    // images CDN URL
    // imagesUrl = {
    //     image1: '',
    //     image2: '',
    //     image3: ''
    // }

    // if(req.body.fileSource1 != '') {
    //     const fileStr = req.body.fileSource1;
    //     const uploadResponse = await cloudinary.uploader.upload(fileStr, {
    //         upload_preset: 'ingredient',
    //     });
    //     imagesUrl.image1 = uploadResponse.url;
    // }
    // if(req.body.fileSource2 != '') {
    //     const fileStr = req.body.fileSource2;
    //     const uploadResponse = await cloudinary.uploader.upload(fileStr, {
    //         upload_preset: 'ingredient',
    //     });
    //     imagesUrl.image2 = uploadResponse.url;
    // }
    // if(req.body.fileSource3 != '') {
    //     const fileStr = req.body.fileSource3;
    //     const uploadResponse = await cloudinary.uploader.upload(fileStr, {
    //         upload_preset: 'ingredient',
    //     });
    //     imagesUrl.image3 = uploadResponse.url;
    // }
    
    // Query string
    var sql = `INSERT INTO ingredient 
    (ingredient, alt_ingredient_1, alt_ingredient_2, alt_ingredient_3, alt_ingredient_1_image, alt_ingredient_2_image, alt_ingredient_3_image) 
    VALUES ( 
        '${req.body.ingredient}', 
        '${req.body.ingredientName1}', '${req.body.ingredientName2}', '${req.body.ingredientName3}', 
        '${req.body.fileSource1}', '${req.body.fileSource2}', '${req.body.fileSource3}'
    )`;

    // connect database
    connection.query(sql, function (err, result, fields) {
        if (err) {
            // console.log('Error', err.sqlMessage, err.code === 'ER_DUP_ENTRY');
            if(err.code === 'ER_DUP_ENTRY') {
                res.status(200).json({
                    code: 502,
                    message: err.sqlMessage,
                });
            } else {
                res.status(200).json({
                    code: 502,
                    message: err.sqlMessage,
                });
            }
        } else {
            // console.log('result', result);

            res.status(200).json({
                code: 200,
                message: "Ingredients added successfully!",
            });
        }
    });
});

// Edit Ingredient data Route
routes.put("", async (req, res, next) => {
    
    // Store Images on cloud server and then store that url in database
        
    // images CDN URL
    // imagesUrl = {
    //     image1: '',
    //     image2: '',
    //     image3: ''
    // }

    // if(req.body.fileSource1 != '') {
    //     const fileStr = req.body.fileSource1;
    //     const uploadResponse = await cloudinary.uploader.upload(fileStr, {
    //         upload_preset: 'ingredient',
    //     });
    //     imagesUrl.image1 = uploadResponse.url;
    // }

    // if(req.body.fileSource2 != '') {
    //     const fileStr = req.body.fileSource2;
    //     const uploadResponse = await cloudinary.uploader.upload(fileStr, {
    //         upload_preset: 'ingredient',
    //     });
    //     imagesUrl.image2 = uploadResponse.url;
    // }

    // if(req.body.fileSource3 != '') {
    //     const fileStr = req.body.fileSource3;
    //     const uploadResponse = await cloudinary.uploader.upload(fileStr, {
    //         upload_preset: 'ingredient',
    //     });
    //     imagesUrl.image3 = uploadResponse.url;
    // }
    
    // Query string
    var sql = `
        UPDATE ingredient 
        SET 
        ingredient = '${req.body.ingredient}', 
        alt_ingredient_1 = '${req.body.ingredientName1}', alt_ingredient_2 = '${req.body.ingredientName2}', alt_ingredient_3 = '${req.body.ingredientName3}', 
        alt_ingredient_1_image = '${req.body.fileSource1}', alt_ingredient_2_image = '${req.body.fileSource2}', alt_ingredient_3_image = '${req.body.fileSource3}' 
        WHERE ingredient = '${req.body.ingredient}'
    `;
    
    // connect database
    connection.query(sql, function (err, result, fields) {
        if (err) {
            // console.log('Error', err.sqlMessage, err.code === 'ER_DUP_ENTRY');
            if(err.code === 'ER_DUP_ENTRY') {
                res.status(200).json({
                    code: 502,
                    message: err.sqlMessage,
                });
            } else {
                res.status(200).json({
                    code: 502,
                    message: err.sqlMessage,
                });
            }
        } else {
            // console.log('result', result);

            res.status(200).json({
                code: 200,
                message: "Ingredients added successfully!",
            });
        }
    });

});

module.exports = routes;