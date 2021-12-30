require('../module/mongoose')
var express = require('express');
var router = express.Router();
var customerModel = require('../module/create-customer');
var invoiceList = require('../module/generate-invoice');
var jwt = require('jsonwebtoken')
var userModel = require('../module/userSign-up')




router.get('/:id', async function (req, res, next) {

    try {

        var invoiceID = req.params.id;

        var cookeData = req.cookies.jwt;

        var currentInvoice = await invoiceList.findOne({_id :invoiceID})
        
        currentInvoice.SubTotal = currentInvoice.SubTotal.replace(/,/g, '')
        currentInvoice.GrandTotal = currentInvoice.GrandTotal.replace(/,/g, '')
      

        var items = JSON.parse(currentInvoice.InvoiceItem)
       


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
           
            res.render('edit-invoice', {currentInvoice : currentInvoice, items:items, currentUser : currentUser, notApprovedUser : notApprovedUser.length});
    
          }
        } else {
          res.redirect('login')
        }

    } catch (error) {

        console.log(error)

    }
  
  });




  router.get('/', async function (req, res, next) {
    
    try {

      var data = req.body.obj;
      data = JSON.parse(data);
      
      var number = Intl.NumberFormat('en-US')

      
      var generatedInvoice = new generateInvoice({
        userID : `${cookeData}`,
        Name: data.name,
        Address: data.address,
        Email: data.email,
        Phone: data.phone,
        NTNNumber: data.ntnNumber,
        InvoiceNo: data.invoiceNumber,
        INCNumber: data.incNumber,
        date: data.date,
        InvoiceItem: data.InvoiceItems,
        SubTotal: number.format(data.subTotal),
        Tax:  number.format(data.Tax),
        GrandTotal: number.format(data.grandTotal),
        AmountInWords: data.AmntInWords,
        Payment_Method: data.paymentMethod,
        Account_Title: data.AccountTitle,
        Account_Number: data.AccountNumber
      });

      console.log(generatedInvoice)


      
    } catch (error) {
      

    }
})













module.exports = router;