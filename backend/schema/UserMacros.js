const mongoose = require('mongoose');
const { Schema } = mongoose;

const userMacros = new Schema({
    user_id:{
        type:String,
        ref:'users'
    }  ,
    carbohdyrates_total: {
        type:Number 
    },
    fat_total: {
        type:Number
    },
    protein_total: {
        type:Number
    },
    carbohdyrates_count: {
        type:Number
    },
    fat_count: {
        type:Number
    },
    protein_count: {
        type:Number
    }
});

module.exports = mongoose.model('user_macros', userMacros);