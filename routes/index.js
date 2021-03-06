require('../module/mongoose')
var express = require('express');
var router = express.Router();
var customerModel = require('../module/create-customer');
var invoiceList = require('../module/generate-invoice');
var jwt = require('jsonwebtoken')
var userModel = require('../module/userSign-up')

/* GET home page. */
router.get('/', async function (req, res, next) {

  try {



    var cookeData = req.cookies.jwt;
    if (cookeData) {

      var currentUser = await userModel.findOne({_id : cookeData})
      var allusers = await userModel.find();

      var notApprovedUser = []
      for(var x =0; x < allusers.length; x++){
        if(allusers[x].approve == "false"){
          notApprovedUser.push(allusers[x])
        }
      }
      

      if(currentUser.approve == "false"){
        res.redirect('/authentication')
      }else{
        res.render('index', {currentUser : currentUser, notApprovedUser : notApprovedUser.length});

      }
    } else {
      res.redirect('login')
    }

  } catch (error) {

  }

});






// getting data if user seach inovice list in invoice listing page
router.get('/getInvoiceList', async function (req, res) {
  try {


    invoiceList.find().exec(function (err, data) {
      if (err) throw err;

      res.send({ invoiceData: data })
    });



  } catch (error) {

  }
});



// getting search data using customers search box
router.get('/searchCustomers', async function (req, res) {
  try {


    customerModel.find().exec(function (err, data) {
      if (err) throw err;

      res.send({ customersData: data })
    });



  } catch (error) {

  }
});









module.exports = router;
