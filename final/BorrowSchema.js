
var mongoose = require('mongoose');
var BorrowSchema =new mongoose.Schema( 
    {
    userID:Number,
    BookID:Number
},
{timestamps:true}
);
module.exports =mongoose.model('Borrow',BorrowSchema,'Borrow');     