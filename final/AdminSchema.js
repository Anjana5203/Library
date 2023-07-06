
var mongoose = require('mongoose');
var AdminSchema =new mongoose.Schema( 
    {

   name:String,
   email:String,
   gender:String,
   phone:Number,
   Working:String
},
{timestamps:true}
);
module.exports =mongoose.model('Admin',AdminSchema,'Admin'); 