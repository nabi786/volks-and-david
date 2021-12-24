require('../module/mongoose')
var express = require('express');
var router = express.Router();


router.get('/account', async function (req, res) {
    try {
        
        res.send("working")
    
    } catch (error) {

    }


})


module.exports = router