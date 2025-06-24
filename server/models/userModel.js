const  mongoose  = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name:{
     type :String,
     required : true
    },
    password:{
        type :String,
        required : true
       },
    email:{
        type :String,
        unique: true,
        required : true
    },
    phone:{
        type :String,
        unique: true,
        required : true
    },
    city :{
        type :String,
       
    },
    isAdmin :{
        type :Boolean,
        default : false
        
    },
    license :{
        type :String,
        required : false
      
       
    },
},
{
    timestamps : true
}
)
module.exports = mongoose.model("User",userSchema)
// isko ese hi export karte hai user is name of that particular schema