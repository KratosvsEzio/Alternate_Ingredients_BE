const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ingredientsSchema = new Schema({
    ingredient: {type: String, required: true, unique: true },
    alt_ingredient_1: {type: String, default: ''},
    alt_ingredient_2: {type: String, default: ''},
    alt_ingredient_3: {type: String, default: ''},
    alt_ingredient_1_image: {type: String, default: ''},
    alt_ingredient_2_image: {type: String, default: ''},
    alt_ingredient_3_image: {type: String, default: ''},
});

module.exports = mongoose.model('Ingredients',ingredientsSchema);
