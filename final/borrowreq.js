var mongoose= require('mongoose');
var borrowSchema=new mongoose.Schema(
    {
        BookID:{
            type:Number,
            unique:true
        },
        email: String,
        status:{
            type:String,
            default:"Pending"
        }
    },
    {timestamps:true}
);
module.exports=mongoose.model('borrow',borrowSchema,'borrow');