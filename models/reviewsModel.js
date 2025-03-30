const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    serviceType:{
        type:String,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },

});

module.exports = mongoose.model('Reviews_and_Ratings',reviewsSchema);