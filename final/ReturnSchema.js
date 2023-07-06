
var mongoose = require('mongoose');
var ReturnSchema =new mongoose.Schema( 
    {
    userID:Number,
    BookID:Number
},
{timestamps:true}
);
module.exports =mongoose.model('Return',ReturnSchema,'Return'); 