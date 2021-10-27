require('../module/mongoose')
var express = require('express');
var router = express.Router();
var invoiceModel = require('../module/generate-invoice');
var customersModel = require('../module/create-customer');

router.get('/', async function (req, res, next) {

    try {  
        // finding cookies 
        var cookeData = req.cookies.jwt

        var invoiceData = await invoiceModel.find();
        var invoiceData = invoiceData.reverse();

        var names =[]
        for(var x =0; x < invoiceData.length; x++){
            data = invoiceData[x].Name
            data = data.replace(" ","-").toLowerCase()
            names.push(data)
        }
        
        var links = names;


        // getting cutomers list fro model
        customersModel.find().exec(function(err,data){
            if(err) throw err;


            var customers = data;
            if(cookeData){

                res.render('invoice-list', {invoiceData : invoiceData, links : links, customers : customers})
            }else{
                res.redirect('login')
            }
        })
        

    
    } catch (error) {
        

    }
});







module.exports = router;
