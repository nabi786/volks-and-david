const mongoose = require("mongoose");
var db = 'mongodb+srv://volkanddavid:davidvolksAnd55998@cluster0.mltjp.mongodb.net/vloks_and_david?retryWrites=true&w=majority'
mongoose.connect(db,
{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex : true,
    
}).then(function(){
    console.log("mongoose connected successfully")
}).catch(function(err){
    console.log(err)
    console.log("mongoose not connected")
})

module.exports = mongoose;