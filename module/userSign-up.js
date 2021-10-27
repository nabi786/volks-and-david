var mongoose = require('./mongoose');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
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
        type : Number,
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


const userModel = new mongoose.model("users", userSchema);

module.exports = userModel