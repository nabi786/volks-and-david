require('../module/mongoose')
var express = require('express');
var router = express.Router();
var invoiceModel = require('../module/generate-invoice');
var customersModel = require('../module/create-customer');

router.get('/', async function (req, res, next) {

    try {  

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
            res.render('invoice-list', {invoiceData : invoiceData, links : links, customers : customers})
        })
        

    
    } catch (error) {
        

    }
});







module.exports = router;
