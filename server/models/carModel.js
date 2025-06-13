const {mongoose } = require("mongoose");

const carSchema = new mongoose.Schema({

   
    name  : {
        type : String ,
        required : true ,
       
    },
    fuel_type : {
        type : String ,
        enum :["petrol","diesel","cng","ev"],
        // collection of constant
        required : true ,
    
    },
    category :{
        type : String ,
        enum :["sedan","hatchback","cuope","suv" ,"jeep"],
        required : true ,
      
    },
    company :{
        type : String ,
        required : true ,
    
    }, 
    rate :{
        type : Number ,
        required : true ,
       
    },
    registration :{
        type : String ,
        required : true ,
       
    },
    imageUrl :{
        type : String ,
        required : true ,
       
    },
     isBooked :{
        type : Boolean ,
        default : false        
     }
},
{
    timestamps : true
}
) 
module.exports = mongoose.model("Car" , carSchema)