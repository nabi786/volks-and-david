require('../module/mongoose')
var express = require('express');
var router = express.Router();
var userModel = require('../module/userSign-up');
var bcrypt = require('bcrypt');
const app = require('../app');

router.get('/', function (req, res, next) {

    res.clearCookie("jwt")
    res.redirect('login')

});







module.exports = router;