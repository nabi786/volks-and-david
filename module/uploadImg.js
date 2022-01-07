var mongoose = require('./mongoose');

var uploadimg = new mongoose.Schema({
    logo : {
        type : String,
    },
});


var uploadimg = new mongoose.model("uploadimg", uploadimg);
 
module.exports = uploadimg;