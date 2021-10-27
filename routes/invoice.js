require('../module/mongoose')
var express = require('express');
var router = express.Router();
var invoiceModel = require('../module/generate-invoice')


/* GET home page. */
router.get('/:name/:id', async function (req, res, next) {
  try {
    // finding cookies 
    var cookeData = req.cookies.jwt

    var userID = req.params.id;
    var currentUser = await invoiceModel.findOne({ _id: userID })
    // console.log(currentUser);
    var InvoiceItem = currentUser.InvoiceItem;
    InvoiceItem = JSON.parse(InvoiceItem);


    if(cookeData){
      res.render('invoice', {InvoiceItem : InvoiceItem, currentUser : currentUser});
    }else{
      res.redirect('login')
    }


  } catch (error) {
      
  }

});



module.exports = router;
