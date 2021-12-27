require('../module/mongoose')
var express = require('express');
var router = express.Router();
var userModel = require('../module/userSign-up');
var bcrypt = require('bcrypt');
const app = require('../app');
const jwt = require('jsonwebtoken');



router.get('/', function (req, res, next) {
    var cookieData = req.cookies.jwt;
    if (cookieData) {
        res.redirect('/')
    } else {
        res.render('login', { errMsg: "" })
    }
});





router.post('/', async function (req, res, next) {
    try {

        var email = req.body.email;
        var email = email.trim()
        var password = req.body.password;
        var password = password.trim()
        var userData = await userModel.findOne({ email: email })

        if (userData) {

            if (userData.userType == "Admin") {
                var isMatch = bcrypt.compareSync(password, userData.password);
            } else {
                var isMatch = bcrypt.compareSync(password, userData.password);
              
            }


            console.log(isMatch)

            if (isMatch == true) {


                const token = jwt.sign({ id: userData._id }, process.env.SECRETKEY);
                const userVarify = jwt.verify(token, process.env.SECRETKEY);
                res.cookie('jwt', userData._id, {
                    httpOnly: true,
                });

                res.redirect('/')
            } else {

                res.render('login', { errMsg: "invalid email or passowrd" })
            }

        } else {

            res.render('login', { errMsg: "invalid email or passowrd" })
        }



    } catch (error) {
        res.send(error)
    }

});



module.exports = router;