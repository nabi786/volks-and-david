require('../module/mongoose')
var express = require('express');
var router = express.Router();
var customerModel = require('../module/create-customer');


router.get('/', async function (req, res, next) {
    try {
        res.render('create-customer', {errMsg : ""});
    } catch (error) {
        res.send(error)
    }
});

router.post('/', async function (req, res, next) {
    try {

        var name = req.body.name;
        var email = req.body.email;
        var phone = req.body.phoneNumber;
        var address = req.body.address;

        var getDate = new Date();


        await customerModel.findOne({ email: email }).exec(function (err, data) {
            if (err) throw err;

            if (data == null) {

                customerModel.findOne({ phone: phone }).exec(function (err2, data2) {
                    if (err) throw err;


                    if(data2 == null){

                        var createCustomer = new customerModel({
                            name: name,
                            email: email,
                            phone: phone,
                            Address: address,
                            join: getDate
                        });
                        createCustomer.save(function (err3, data3) {
                            if (err) throw err;
                            console.log('customer created successfully')
                            res.redirect('customers');
                        });
                    }else {

                        res.render('create-customer', {errMsg : "data already exist"})
                    }


                })
            }else {

                res.render('create-customer', {errMsg : "data already exist"})

            }
        })






    } catch (error) {
        res.send(error)
    }
});








module.exports = router;