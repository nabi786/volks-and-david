require('../module/mongoose')
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var usersModel = require('../module/userSign-up')


var newDate = new Date();


router.get('/', function(req,res,next){
    res.render('signup',{passworderr : ""})
});

router.post('/', function (req, res, next) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var phnNumber = req.body.phnNumber;
  var password = req.body.password;
  var cpassword = req.body.confirmPassword;

  if (password == cpassword) {
    password = bcrypt.hashSync(password, 10);
    var userData = new usersModel({
      firstname: fname,
      lastname: lname,
      email: email,
      phone: phnNumber,
      password: password,
      date : newDate,
    })

    userData.save(function (err, data) {
      if (err) throw err;
      res.redirect('/')
    })


  } else {
    res.render('signup', { passworderr: "password does not match" });
  }

});




module.exports = router;