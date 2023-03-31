const mongoose = require('mongoose');
const { Schema } = mongoose;

const MasterDataFood = new Schema({
    title: {
        type:String
    },
    carbo: {
        type:Number
    },
    fat: {
        type:Number
    },
    protein: {
        type:Number
    },
    calories: {
        type:Number
    }
});

module.exports = mongoose.model('master_data_food' , MasterDataFood);