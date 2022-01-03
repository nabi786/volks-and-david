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

          if(currentUser.approve == "false"){
            res.redirect('/authentication')
          }else{

            var allusers = await userModel.find();

            var notApprovedUser = []
            for(var x =0; x < allusers.length; x++){
              if(allusers[x].approve == "false"){
                notApprovedUser.push(allusers[x])
              }
            }
            

            res.render('generate-invoice', { userDetial: "", customerList: customerList, currentUser: currentUser, notApprovedUser: notApprovedUser.length});
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

router.post('/', async function (req, res, next) {

  try {

    


  } catch (error) {
    console.log(error)
  }

});




// generate invocie from cutomers list 
router.get('/:id', async function (req, res, next) {
  // try {

  //   var userID = req.params.id;

  //   var userDetial = await customersModel.findOne({ _id: userID });
  //   var customerList = await customersModel.find();
    

  //   var currentUser = await userModel.findOne({_id : req.cookies.jwt})
  //     // console.log(currentUser)

  //     var allusers = await userModel.find();

  //     var notApprovedUser = []
  //     for(var x =0; x < allusers.length; x++){
  //       if(allusers[x].approve == "false"){
  //         notApprovedUser.push(allusers[x])
  //       }
  //     }

  //   res.render('generate-invoice', { userDetial: userDetial, customerList: customerList, currentUser : currentUser,notApprovedUser : notApprovedUser.length});
    

  // } catch (error) {

  // }

})




module.exports = router;
