const { cloudinary } = require('../cloudinary');
const express = require('express');
const routes = express.Router();
const connection = require('../Db');

// Fetch Ingredient data Route
routes.get("/:ingredient", (req, res, next) => {

    console.log('Resppnse', req.params.ingredient);

    connection.query(`SELECT * FROM ingredient WHERE ingredient = '${req.params.ingredient}'`, function (err, result, fields) {
        if (err) throw err;
        //Return the result object:
        console.log(result);

        res.status(200).json({
          message: "ingredients fetched successfully!",
          data: result
        });
    });

});

// Add New Ingredient data Route
routes.post("", async (req, res, next) => {
    try {
        
        // images CDN URL
        imagesUrl = {
            image1: '',
            image2: '',
            image3: ''
        }

        if(req.body.fileSource1 != '') {
            const fileStr = req.body.fileSource1;
            const uploadResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'ingredient',
            });
            imagesUrl.image1 = uploadResponse.url;
        }
        if(req.body.fileSource2 != '') {
            const fileStr = req.body.fileSource2;
            const uploadResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'ingredient',
            });
            imagesUrl.image2 = uploadResponse.url;
        }
        if(req.body.fileSource3 != '') {
            const fileStr = req.body.fileSource3;
            const uploadResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'ingredient',
            });
            imagesUrl.image3 = uploadResponse.url;
        }
        
        // Query string
        var sql = `INSERT INTO ingredient 
        (ingredient, alt_ingredient_1, alt_ingredient_2, alt_ingredient_3, alt_ingredient_1_image, alt_ingredient_2_image, alt_ingredient_3_image) 
        VALUES ( 
            '${req.body.ingredient}', 
            '${req.body.ingredientName1}', '${req.body.ingredientName2}', '${req.body.ingredientName3}', 
            '${imagesUrl.image1}', '${imagesUrl.image2}', '${imagesUrl.image3}'
        )`;

        // connect database
        connection.query(sql, function (err, result, fields) {
            if (err) throw err;
            //Return the fields object:
            console.log(result);

            res.status(200).json({
              message: "ingredients added successfully!",
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }

});

module.exports = routes;