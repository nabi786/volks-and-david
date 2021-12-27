require('../module/mongoose')
var express = require('express');
var router = express.Router();
var customerModel = require('../module/create-customer');
var userModel = require('../module/userSign-up')



router.get('/', async function (req, res, next) {

    try {  
        // finding cookies 
        var cookeData = req.cookies.jwt

        // fiding customers
        var customers = await customerModel.find();
        if(customers){
            customers = customers.reverse();

            if(cookeData){

                var currentUser = await userModel.findOne({_id : cookeData});
                
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

                      res.render('customers',{customersList : customers, currentUser : currentUser, notApprovedUser : notApprovedUser.length});
                  }


            }else{
                res.redirect('login')
            }
        }
    
    } catch (error) {
        

    }
});




module.exports = router;
