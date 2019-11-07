var express = require('express');
var router = express.Router();
var mongoose = require('./db')


var pictureSchema  = mongoose.Schema({
  pictureName : String,
  pictureUrl : String,
  age: Number,
  gender: String,
  
 
});


var pictureModel = mongoose.model('picture', pictureSchema );



module.exports = pictureModel;