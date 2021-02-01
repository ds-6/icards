const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  card:{
    type:String,
    required: true
  },
  issuedTo:{
    type:String,
    required: true
  },
  date:{
    type:String,
    required:true
  }
}, {timestamps:true});

const Card = mongoose.model('card',cardSchema);
module.exports = Card;