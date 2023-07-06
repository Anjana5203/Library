//create and declaring a table and using in a node file
//method to create table in node file
var mongoose =require('mongoose');
var BookSchema =new mongoose.Schema( 
    {
        BookISBN:String,
        BookID:Number,
        BookName:String,
        Author:String,
        PublishYear:Number,
        available: Boolean,
    
},
{timestamps:true}
);
module.exports =mongoose.model('Book',BookSchema,'Book'); 

