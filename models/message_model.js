const mongoose = require('mongoose'); 
const schema = mongoose.Schema({
    msg:String, 
    recieverId:mongoose.Schema.ObjectId , 
} , {timestamps: true}) ;
module.exports= mongoose.model('message',schema);