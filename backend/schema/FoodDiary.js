const mongoose = require('mongoose');
const { Schema } = mongoose;

const FoodDiarySchema = new Schema({
     carbo:{
        type:Number
     },
     fat: {
        type:Number
     },
     protein: {
        type:Number
     },
     title: {
        type:String ,
        required:true
     },
     user_id: {
        type:String,
        ref:'users',
     },
     type: {
        type:String,
        required:true
     },
     calories:{
      type:Number
     }
});

module.exports = mongoose.model('food_diary' , FoodDiarySchema);