const mongoose = require('mongoose');

var userSchema= mongoose.Schema({
    usrname:{
        type:String,
        unique:true,
        required:true,
    },
    pws:{
        type:String,
        required:true,
    },
    configpws:{
        type:String,
        required:true,
    },
    fullname:String,
    email:String,
    phone:Number,
    roles:Number,
    room:Object,
//    token:String,
    is_delete:Number,
    create_at:Date,
})
module.exports=mongoose.model('User',userSchema);