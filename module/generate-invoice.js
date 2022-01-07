var mongoose = require('./mongoose');

var generateInvoice = new mongoose.Schema({
    userID : {
        type : String,
        required : true,
    },
    OwnName : {
        type : String,
        required : true,
    },
    OwnEmail : {
        type : String,
        required : true,
    },
    OwnAddress : {
        type : String,
        required : true
    },
    OwnPhone : {
        type : String,
        required : true
    },
    ToName : {
        type : String,
        required : true,
    },
    ToEmail : {
        type : String,
        required : true,
    },
    ToAddress : {
        type : String,
        required : true
    },
    ToPhone : {
        type : String,
        required : true
    },

    NTNNumber :{
        type : String,
       
    },
    InvoiceNo : {
        type : String,
       
    },
    INCNumber : {
        type : String,
       
    },
    date : {
        type : String,
        
    },
    InvoiceItem: {
        type : String,
       
    },
    SubTotal : {
        type : String,
      
    },
    Tax : {
        type : String,
        
    },
    GrandTotal : {
        type : String,
       
    },

    DueBalance : {
        type : String,
        
    },
    Payment_Method : {
        type : String,
       
    },
    Account_Title : {
        type : String,
        
    },
    Account_Number : {
        type : String,
        
    },
    
    companyLogo : {
        type : String
    },
    signature : {
        type : String
    }
    
});


var generateInvoice = new mongoose.model("Generate-invocie", generateInvoice);
 
module.exports = generateInvoice;