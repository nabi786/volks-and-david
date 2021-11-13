require('../module/mongoose')
var express = require('express');
var router = express.Router();
var customerModel = require('../module/create-customer');
var invoiceList = require('../module/generate-invoice');
var jwt = require('jsonwebtoken')
var userModel = require('../module/userSign-up')



router.get('/',function(req,res){

    res.render('err')

})


module.exports = router;