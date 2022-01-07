require('../module/mongoose')
var express = require('express');
var router = express.Router();
var generateInvoice = require('../module/generate-invoice');
var customersModel = require('../module/create-customer');
var userModel = require('../module/userSign-up');
const multer = require('multer')
var path = require('path')



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

          if (currentUser.approve == "false") {
            res.redirect('/authentication')
          } else {

            var allusers = await userModel.find();

            var notApprovedUser = []
            for (var x = 0; x < allusers.length; x++) {
              if (allusers[x].approve == "false") {
                notApprovedUser.push(allusers[x])
              }
            }


            res.render('generate-invoice', { userDetial: "", customerList: customerList, currentUser: currentUser, notApprovedUser: notApprovedUser.length });
          }


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



  // upload logo 
  const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {

      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
  });

  var uploads = multer({ storage: storage });
  var uploadMultiple = uploads.fields([{ name: 'uploadLogofile', maxCount: 1 }, { name: 'uploadSignature', maxCount: 1 }])


router.post('/',uploadMultiple, async function (req, res, next) {

  try {


      var logo = ""
      var signature = ""
      if(req.files){

        logo =  req.files.uploadLogofile[0].filename;
        signature = req.files.uploadSignature[0].filename;

      }
      
      var userIDfromCookie = req.cookies.jwt;
      
      var ivoiceItems = []
      if(req.body.ItemList){
         ivoiceItems = req.body.ItemList
      }

      var ntn = ""
      if(req.body.ntn){
        ntn = req.body.ntn
      }

      var incNo = ""
      if(req.body.inc){
        incNo = req.body.inc
      }

      
      var gnrateInvoice = new generateInvoice({
      userID : userIDfromCookie,
      OwnName : req.body.cname,
      OwnEmail : req.body.cemail,
      OwnAddress : req.body.caddress,
      OwnPhone :req.body.cphone,
      ToName : req.body.toname,
      ToEmail : req.body.toemail,
      ToAddress : req.body.toaddress,
      ToPhone : req.body.tophone,
      NTNNumber :ntn,
      InvoiceNo : req.body.invoiceNo, 
      INCNumber : incNo,
      date : req.body.date, 
      InvoiceItem: ivoiceItems,
      SubTotal : req.body.subTotal,
      Tax : req.body.tax,
      GrandTotal : req.body.total,
      DueBalance: req.body.dueBalance,
      Payment_Method : req.body.payment_method,
      Account_Title :req.body.account_title,
      Account_Number : req.body.account_no,
      companyLogo :  logo,
      signature : signature
      }) 


      gnrateInvoice.save(function(err,data){
        if(err) throw err

      })
      res.redirect('generate-invoice')

        
      
     

      
      

     


  } catch (error) {
    console.log(error)
  }

});











module.exports = router;
