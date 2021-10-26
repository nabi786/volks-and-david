require('../module/mongoose')
var express = require('express');
var router = express.Router();
var customerModel = require('../module/create-customer');
var invoiceList = require('../module/generate-invoice')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});






// getting data if user seach inovice list in invoice listing page
router.get('/getInvoiceList', async function(req,res){
  try {


        invoiceList.find().exec(function(err,data){
         if(err) throw err;

          res.send({invoiceData : data})
       });
      
    
      
  } catch (error) {
      
  }
});



// getting search data using customers search box
router.get('/searchCustomers', async function(req,res){
  try {


      customerModel.find().exec(function(err,data){
         if(err) throw err;

          res.send({customersData : data})
       });
      
    
      
  } catch (error) {
      
  }
});

module.exports = router;
