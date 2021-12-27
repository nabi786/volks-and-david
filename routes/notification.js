require('../module/mongoose')
var express = require('express');
var router = express.Router();
var userModel = require('../module/userSign-up')

/* GET home page. */
router.get('/', async function (req, res, next) {

  try {



    var cookeData = req.cookies.jwt;
    if (cookeData) {

      var currentUser = await userModel.findOne({_id : cookeData})
      var allusers = await userModel.find()
      var allusers =  allusers.reverse()

      if(currentUser.userType == "Admin"){

       

        var notApprovedUser = []
        for(var x =0; x < allusers.length; x++){
          if(allusers[x].approve == "false"){
            notApprovedUser.push(allusers[x])
          }
        }

          res.render('notification', {currentUser : currentUser, allusers: allusers,notApprovedUser:notApprovedUser.length});
      
      }else{
        res.redirect("/err")
      }
    } else {
      res.redirect('login')
    }


  } catch (error) {

  }

});



module.exports = router;
