require('../module/mongoose')
var express = require('express');
var router = express.Router();
var customerModel = require('../module/create-customer');
var invoiceList = require('../module/generate-invoice');
var jwt = require('jsonwebtoken')
var userModel = require('../module/userSign-up')



router.get('/', async function (req, res, next) {

    try {
  
      var cookeData = req.cookies.jwt;
      if (cookeData) {
  
        var currentUser = await userModel.findOne({_id : cookeData})
        
        res.render('approve-account', {currentUser : currentUser});
      } else {
        res.redirect('login')
      }
  
    } catch (error) {
  
    }
  
});

module.exports = router;