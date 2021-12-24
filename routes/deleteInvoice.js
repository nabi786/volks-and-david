require('../module/mongoose')
var express = require('express');
var router = express.Router();
var invoiceList = require('../module/generate-invoice')



router.get('/:id', async function (req, res, next) {
    try {

        var id = req.params.id;

        invoiceList.findOneAndDelete({_id : id}).exec(function(err,data){
            if(err) throw err;
            
            res.redirect('/invoice-list')
        })


    } catch (error) {
        res.send(error)
    }
});




module.exports = router;
