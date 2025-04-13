const { required } = require('joi');
const mongoose = require('mongoose');
const passportLocalmongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;


const User = new Schema({
    email:{
        type:String,
        required:true
    }
})


User.plugin(passportLocalmongoose);

module.exports = mongoose.model('User' , User);