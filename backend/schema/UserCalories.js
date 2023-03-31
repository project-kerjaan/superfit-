const mongoose = require('mongoose');
const { Schema } = mongoose;

const userCalories = new Schema({
     user_id: {
        type:String,
        ref:'users', 
        required:true 
     },
     calories_total: {
        type:Number
     },
     food_total: {
        type:Number 
     },
     calories_remaining: {
        type:Number 
     },
     food_remaining: {
        type:Number 
     }
});

module.exports = mongoose.model('user_calories', userCalories);