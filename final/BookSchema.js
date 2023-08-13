//create and declaring a table and using in a node file
//method to create table in node file
const fileUpload = require('express-fileupload');
var mongoose =require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var BookSchema =new mongoose.Schema( 
    {
        BookISBN:Number,
        BookID:Number,
        BookName:String,
        Author:String,
        PublishYear:Number,
        image: String, //image
        Description:String,
        borrowed:{
            type:Boolean,
            default:false
       }
     
},
{timestamps:true}
);
BookSchema.plugin(AutoIncrement, { id: 'book_counter', inc_field: 'BID' });
module.exports =mongoose.model('Book',BookSchema,'Book'); 

