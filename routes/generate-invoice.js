require('../module/mongoose')
var express = require('express');
var router = express.Router();
var generateInvoice = require('../module/generate-invoice');
var customersModel = require('../module/create-customer');
var userModel = require('../module/userSign-up');


/* GET home page. */
router.get('/', async function (req, res, next) {

  try {

    // searching cookie data
    var cookeData = req.cookies.jwt;

    customersModel.find().exec(async function (err, data) {
      try {


        if (err) throw err;

        var customerList = data;

        if (cookeData) {

          var currentUser = await userModel.findOne({ _id: cookeData });

          res.render('generate-invoice', { userDetial: "", customerList: customerList, currentUser: currentUser });


        } else {
          res.redirect('login')
        }
      } catch (error) {

      }
    })


  } catch (error) {
    console.log(error)
  }


});

router.post('/', async function (req, res, next) {

  try {


    var data = req.body.obj;
    data = JSON.parse(data);

    var cookeData = req.cookies.jwt;
    var currentUser = await userModel.find({_id : cookeData})
    

    var generatedInvoice = new generateInvoice({
      userID : `${currentUser[0].userID}`,
      Name: data.name,
      Address: data.address,
      Email: data.email,
      Phone: data.phone,
      NTNNumber: data.ntnNumber,
      InvoiceNo: data.invoiceNumber,
      INCNumber: data.incNumber,
      date: data.date,
      InvoiceItem: data.InvoiceItems,
      SubTotal: data.subTotal,
      Tax: data.Tax,
      GrandTotal: data.grandTotal,
      AmountInWords: data.AmntInWords,
      Payment_Method: data.paymentMethod,
      Account_Title: data.AccountTitle,
      Account_Number: data.AccountNumber
    });

    generatedInvoice.save().exec(function (err, data) {
      if (err) throw err;
      
      res.redirect('/invoice-list')
    })


  } catch (error) {

  }

});





router.get('/:id', async function (req, res, next) {
  try {

    var userID = req.params.id;

    var userDetial = await customersModel.findOne({ _id: userID });
    var customerList = await customersModel.find();
    

    var currentUser = await userModel.findOne({_id : req.cookies.jwt})
      // console.log(currentUser)
    res.render('generate-invoice', { userDetial: userDetial, customerList: customerList, currentUser : currentUser});
    

  } catch (error) {

  }

})




module.exports = router;
