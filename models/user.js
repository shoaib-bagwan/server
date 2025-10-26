const mongoose=require('mongoose');
const Users=mongoose.Schema({
    username:String,
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    address:{type:String,required:true},
    mobileNo:{type:String,required:true},
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
});
module.exports=mongoose.model("Users_Collection",Users);