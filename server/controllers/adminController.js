
 const expressAsyncHandler = require("express-async-handler")
const Car = require("../models/carModel")
const Rental = require("../models/rentalModel")
const Review = require("../models/reviewModel")

const addCar = expressAsyncHandler(async(req,res) =>{
    const {name,category,company,rate,fuel_type,registration,imageUrl} = req.body
 
 
 if(!name||!category||!company||!rate||!fuel_type||!registration||!imageUrl){
     res.status(400)
     throw new Error("all feilds are required")
 }
  const car = await Car.create({name,category,company,rate,fuel_type,registration,imageUrl})
   if (!car){
     res.status(400)
     throw new Error("car is not created")
   }
   res.status(200).json(car)
 })


//  delete car
const deleteCar = expressAsyncHandler(async(req,res) =>{
    const deleteCar = await Car.findByIdAndDelete(req.params.cid)

if(!deleteCar){
   res.status(400)
   throw new Error("Car not deleted")
}     
    
       res.status(200).json({id : deleteCar._id,
        msg :"car deleted"
       })
})

// updated car
const updateCar = expressAsyncHandler (async(req,res) =>{
   const updateCar = await Car.findByIdAndUpdate(req.params.cid , req.body ,{new : true })
   if (!updateCar) {
    res.status(400)
    throw new Error(" not updated")
   }

   res.status(200).json(updateCar)
} )

// get all rentals
const getAllUserRentals = expressAsyncHandler(async (req,res)=>{
 
    const rentals = await Rental.find()
    .populate({ path: "car", select: "name registration" })
    .populate({ path: "user", select: "name" })
   //  .populate({ path: "car", select: "registration" });
     if (!rentals){
        res.status(404)
        throw new Error("reviews not found")
     }
     res.status(200).json(rentals)
})


// get all reviews
const getAllUserReviews =  expressAsyncHandler(async (req,res)=>{
 
    const reviews = await Review.find()
    .populate({ path: "car", select: "name " })
    .populate({ path: "user", select: "name" })
   
     if (!reviews){
        res.status(404)
        throw new Error("reviews not found")
     }
     res.status(200).json(reviews)
})

module.exports = {addCar,getAllUserRentals,getAllUserReviews,deleteCar,updateCar}