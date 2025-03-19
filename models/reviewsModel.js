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
    description:{
        type:String,
        required:true
    },
});

module.exports = mongoose.model('Reviews_and_Ratings',reviewsSchema);