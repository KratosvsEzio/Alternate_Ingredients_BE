const express = require('express');
const mongoose = require('mongoose');
const routes = express.Router(); 


/* Require Ingredients models here */
let Ingredients = require('../Models/ingredients.model');


// Fetch Ingredient data Route
routes.get("", (req, res, next) => {
    res.status(200).json({
        message: "Alternate Ingredients Backend connected successfully!",
    });
});

// Fetch Ingredient data Route
routes.get("/:ingredient", (req, res, next) => {
    const ingredientName = req.params.ingredient;

    // console.log('Ingredient Name', ingredientName);


    Ingredients.findOne({'ingredient': ingredientName})
    .then( result => {
        if(!result) {
            return res.status(200).json({
                code: 500,
                message: `Ingredient "${ingredientName}" was not found!`,
                error: err
            })

        } else {
            res.status(200).json({
                code: 200,
                message: "ingredients fetched successfully!",
                data: [result]
            });
        }
    })
    .catch( err => {
        return res.status(200).json({
            code: 500,
            message: `Ingredient "${ingredientName}" was not found!`,
            error: err
        })
    })
});

// Add New Ingredient data Route
routes.post("", (req, res, next) => {

    // console.log('Ingredient Name', req.body);

    // Create new ingredient instance
    let ingredient = new Ingredients({
        ingredient: req.body.ingredient,
        alt_ingredient_1: req.body.ingredientName1,
        alt_ingredient_2: req.body.ingredientName2,
        alt_ingredient_3: req.body.ingredientName3,
        alt_ingredient_1_image: req.body.fileSource1,
        alt_ingredient_2_image: req.body.fileSource2,
        alt_ingredient_3_image: req.body.fileSource3
    })

    // Added Ingredient to database
    ingredient.save()
    .then( result => {

        // console.log(result,'result after saving');

        res.status(200).json({
            code: 200,
            message: "Ingredient fetched successfully!",
            data: result
        });
      
    })

    // Error Handlers
    .catch( err => {

        // console.log(err)
        
        if(err.code === 11000) {
            return res.status(200).json({
                code: 500,
                message: "Duplicate Ingredient!",
                error: err
            })
        } else {
            return res.status(200).json({
                code: 200,
                message: "Ingredient creation failed!",
                error: err
            })
        }
    })
})

// Edit Ingredient data Route
routes.put("", (req, res, next) => {

    // console.log('Ingredient Name', req.body.ingredient);

    Ingredients.findOneAndUpdate(
        {'ingredient': req.body.ingredient}, 
        {
            ingredient: req.body.ingredient,
            alt_ingredient_1: req.body.ingredientName1,
            alt_ingredient_2: req.body.ingredientName2,
            alt_ingredient_3: req.body.ingredientName3,
            alt_ingredient_1_image: req.body.fileSource1,
            alt_ingredient_2_image: req.body.fileSource2,
            alt_ingredient_3_image: req.body.fileSource3
        }, 
        {upsert: true}, (err, result) => {

            // Error
            if(err) { 
                if(err.code === 11000) {
                    res.status(200).json({
                        code: 500,
                        message: "Duplicate Ingredient!",
                        error: err
                    })
                } else {
                    res.status(200).json({
                        code: 500,
                        message: "Ingredient creation failed!",
                        error: err
                    })
                }
            } 
            
            // Success
            else {

                // console.log(result,'result after saving');
                
                Ingredients.findOne({'ingredient': result.ingredient})
                .then( innerResult => {
                    if(!innerResult) {
                        return res.status(200).json({
                            code: 500,
                            message: `Ingredient "${result.ingredient}" was not found!`,
                            error: err
                        })
                    } else {
                        res.status(200).json({
                            code: 200,
                            message: "ingredients fetched successfully!",
                            data: [innerResult]
                        });
                    }
                })
                .catch( err => {
                    return res.status(200).json({
                        code: 500,
                        message: `Ingredient "${result.ingredient}" was not found!`,
                        error: err
                    })
                })
            }
        }
    );

});

module.exports = routes;