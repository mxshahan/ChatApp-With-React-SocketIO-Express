const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
    body:String,
    from: String
})

module.exports=mongoose.model('message',Message);