require('../module/mongoose')
var express = require('express');
var router = express.Router();
var userModel = require('../module/userSign-up');



router.get('/:id', async function (req, res, next) {

    try {

        var id = req.params.id
        var currentUser = await userModel.findOneAndUpdate({_id: id},{
            approve : true
        }, function(err,data){
            if(err) throw err;
            res.redirect('/notification')
        })
        

    } catch (error) {

    }
});







module.exports = router;