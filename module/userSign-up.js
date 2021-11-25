var mongoose = require('./mongoose');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    userType : {
        type : String,
        required : true,
    },
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    }
});


const userModel = new mongoose.model("user", userSchema);

module.exports = userModel