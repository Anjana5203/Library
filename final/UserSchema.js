//create and declaring a table and using in a node file
//method to create table in node file
var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var UserSchema =new mongoose.Schema( 
    {
        //key values
        role:String,
        userID:Number,
        username:String,
        admissionNo:Number,
        email:String,
        phoneNo:Number,
        sex:String,
        address:String
    },
    {timestamps:true}
);
UserSchema.plugin(AutoIncrement, {inc_field: 'uid'});

module.exports =mongoose.model('User',UserSchema,'User'); 