const { mongoose } = require("mongoose");

const rentalSchema = new mongoose.Schema({

    car :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Car',
        required :true
    },
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required :true
    },

    pickupDate :{
        type : String,
        required : true
    } ,
    dropDate :{
        type : String,
        required : true
    } ,
    totalBill :{
        type : Number,
        
    } ,
    isbooked : {
        type : Boolean,
        default : false
        

    }
  


},
{
    timestamps : true
}
)
module.exports = mongoose.model("Rental",rentalSchema)