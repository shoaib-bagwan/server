const mongooes=require('mongoose');
let logos=mongooes.Schema({
    imageSrc:{type:String},
    logoName:{type:String},
});
module.exports=mongooes.model("Logos",logos)