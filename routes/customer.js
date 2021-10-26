require('../module/mongoose')
var express = require('express');
var router = express.Router();
var customerModel = require('../module/create-customer');

router.get('/', async function (req, res, next) {

    try {  

        var customers = await customerModel.find();

        if(customers){
            customers = customers.reverse();
            res.render('customers',{customersList : customers});
        }
    
    } catch (error) {
        

    }
});




module.exports = router;
