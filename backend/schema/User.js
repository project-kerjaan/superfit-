const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
     name: {
        type:String,
        required:true
     },
     email: {
        type:String,
        required:true
     },
     password: {
        type:String,
        required:true
     },
     profile: {
        type:String,
     },
     age: {
        type:Number,
     },
     birthday: {
        type:Date,
     },
     weight: {
        type:Number
     },
     height: {
        type:Number
     },
     goal: {
        type:String
     },
     active_title: {
        type:String
     },
     active_count: {
        type:Number
     },
     isCompleteStep: {
      type:Boolean,
      default:false
     }
});

module.exports = mongoose.model('user', userSchema);