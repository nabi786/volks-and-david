require('../module/mongoose')
var express = require('express');
var router = express.Router();
var userLIst = require('../module/userSign-up');
var userModel = require('../module/userSign-up')

router.get('/', async function (req, res) {
   try {


      var userData = await userLIst.find()
      // console.log(userData)
      var typeUserList = [];
      userData.forEach(function (item) {
         if (item.userType == "User") {
            typeUserList.push(item)
         }
      })

      userslist = typeUserList.reverse();

      var cookeData = req.cookies.jwt;
      if (cookeData) {

         var currentUser = await userModel.findOne({_id :cookeData});

         if(currentUser.approve == "false"){

            res.redirect('/authentication')

          }else {

            var allusers = await userModel.find();

            var notApprovedUser = []
            for(var x =0; x < allusers.length; x++){
              if(allusers[x].approve == "false"){
                notApprovedUser.push(allusers[x])
              }
            }

             res.render('usersList', { userslist: userslist, currentUser: currentUser, notApprovedUser : notApprovedUser.length});
             
          }

      } else {
         res.redirect('login')
      }


   } catch (error) {


   }
});








module.exports = router;