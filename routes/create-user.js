require('../module/mongoose')
var express = require('express');
var router = express.Router();
var userModel = require('../module/userSign-up')

/* GET home page. */
router.get('/', async function (req, res) {
    try {


        var cookeData = req.cookies.jwt;
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

                res.render('create-user', { passError: "", currentUser: currentUser,notApprovedUser:notApprovedUser.length });
                
            }
        } else {
            res.redirect('login');
        }

    } catch (error) {

    }

});



router.post('/', async function (req, res) {

    try {

        var name = req.body.name;
        var lastname = req.body.lname
        var email = req.body.email;
        var number = req.body.phoneNumber;
        var password = req.body.password;
        var cpassword = req.body.cpassword;





        if (password != cpassword) {
            res.render('create-user', { passError: "password does not match" });
        } else {

            // var users = await userModel.findOne({userType : "Admin"})
            // console.log(users);

            var newUser = new userModel({
                userType: "User",
                firstname: name,
                lastname: lastname,
                email: email,
                phone: number,
                password: password,
                date: new Date().toLocaleDateString()

            });


            newUser.save(function (err, data) {
                if (err) throw err;
                res.redirect('users-list')
            })
        }

    } catch (error) {

    }

});



module.exports = router;