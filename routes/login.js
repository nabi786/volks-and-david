require('../module/mongoose')
var express = require('express');
var router = express.Router();
var userModel = require('../module/userSign-up');
var bcrypt = require('bcrypt');
const app = require('../app');

router.get('/', function (req, res, next) {

    res.render('login', { errMsg: "" })
});



router.post('/', async function (req, res, next) {
    try {

        var email = req.body.email;
        var password = req.body.password;
        var userData = await userModel.findOne({ email: email })

        if(userData){

            
            var isMatch = bcrypt.compareSync(password, userData.password);
            if (isMatch == true) {
                
                res.redirect('/')
            } else {
               
                res.redirect('login')
            }
            
        }else{
            
            res.redirect('login')
        }



    } catch (error) {
        res.send(error)
    }

});



module.exports = router;