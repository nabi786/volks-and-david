require('../module/mongoose')
var express = require('express');
var router = express.Router();
var invoiceModel = require('../module/generate-invoice')
var userModel = require('../module/userSign-up')

/* GET home page. */
router.get('/:name/:id', async function (req, res, next) {
  try {
    // finding cookies 
    var cookeData = req.cookies.jwt
    
    var invoiceID = req.params.id;
    var currentInvoice = await invoiceModel.findOne({ _id: invoiceID })
    
    var InvoiceItem = currentInvoice.InvoiceItem;
    InvoiceItem = JSON.parse(InvoiceItem);

    var number = Intl.NumberFormat('en-US')

    var invoiceData = []
    for(var x =0; x <InvoiceItem.length; x++){
      InvoiceItem[x].unitPrice = number.format(InvoiceItem[x].unitPrice)
      InvoiceItem[x].totalPrice = number.format(InvoiceItem[x].totalPrice)
      InvoiceItem[x].netPrice = number.format(InvoiceItem[x].netPrice)

      var newAry = InvoiceItem[x]
      invoiceData.push(newAry)
    }

    if(cookeData){

        var currentUser = await userModel.findOne({_id : cookeData})
        var allusers = await userModel.find();

        var notApprovedUser = []
        for(var x =0; x < allusers.length; x++){
          if(allusers[x].approve == "false"){
            notApprovedUser.push(allusers[x])
          }
        }
        // console.log(currentInvoice)
        res.render('invoice', {InvoiceItem : invoiceData, currentInvoice : currentInvoice, currentUser : currentUser, notApprovedUser:notApprovedUser.length});
      
    }else{
      res.redirect('login')
    }


  } catch (error) {
    console.log(error)
  }

});



module.exports = router;
