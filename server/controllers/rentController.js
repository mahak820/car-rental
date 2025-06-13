const expressAsyncHandler = require("express-async-handler")
const Car = require("../models/carModel")
const User = require("../models/userModel")
const Rental = require("../models/rentalModel")

const getAllRents = expressAsyncHandler (async (req,res) =>{
   const rentals = await Rental.find()
   .populate({ path: "car", select: "name imageUrl" })
   .populate({ path: "user", select: "name" });

   res.status(200).json(rentals)


})

// get single rent
const getOwnRent = expressAsyncHandler(  async (req,res) =>{
  const getOwnRent = await Rental.find({user : req.user._id})
  .populate({ path: "car", select: "name imageUrl" })
  .populate({ path: "user", select: "name" });


  if(!getOwnRent){
   res.status(400)
   throw new Error("rent is not found")
  }

  res.status(200).json(getOwnRent)
})


// add rent
const addRent = expressAsyncHandler (async (req,res) =>{
    const {dropDate,pickupDate} = req.body
    
    
    if(!dropDate||!pickupDate){
        res.status(400)
        throw new Error("all feilds are required")
    }
    // if(!Rental.isbooked ){
    //  isbooked = true
    // }

 const carExist = await Car.findById(req.params.cid)
  if(!carExist){
    res.status(400)
    throw new Error("car not exist")

  }
  if(carExist.isbooked){
    res.status(400)
    throw new Error("car already booked")

  }
  const pickup = new Date(pickupDate);
  const drop = new Date(dropDate);
  
  // Convert to days
    const timeDiff = Math.abs(drop - pickup);
  const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
  // Final total bill
  const totalBill = days * carExist.rate;
 
  
     const addRent = await Rental.create({
        car : req.params.cid , 
        user : req.user._id , 
        pickupDate ,
        dropDate ,
        totalBill,
        isbooked : true
     })

    //  update status
    let updatedRental = await Car.findByIdAndUpdate(req.params.cid, {isBooked : true}, {new : true})
  
    
 res.status(200).json(addRent)
    
})
// update rental
const updateRental = expressAsyncHandler(async (req, res) => {
  const { pickupDate, dropDate } = req.body;

  if (!pickupDate || !dropDate) {
    res.status(400);
    throw new Error("Kindly add Pickup Date & Drop Date");
  }

  // Convert from dd-mm-yyyy → yyyy-mm-dd
  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-');
    return new Date(`${year}-${month}-${day}`);
  };

  const pickup = formatDate(pickupDate);
  const drop = formatDate(dropDate);

  const rental = await Rental.findById(req.params.rid);
  if (!rental) {
    res.status(404);
    throw new Error("Rental not found");
  }

  const carExist = await Car.findById(rental.car);
  if (!carExist) {
    res.status(404);
    throw new Error("Car not found");
  }

  const timeDiff = Math.abs(drop - pickup);
  const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  const totalBill = days * carExist.rate;

  const updatedRental = await Rental.findByIdAndUpdate(
    req.params.rid,
    {
      pickupDate: pickup,
      dropDate: drop,
      totalBill
    },
    { new: true }
  ).populate({ path: "car", select: "name imageUrl" })
  .populate({ path: "user", select: "name" });

  if (!updatedRental) {
    res.status(400);
    throw new Error("Rental not updated");
  }

  res.status(200).json(updatedRental);
});
// delete rental
const deleteRental = expressAsyncHandler(async (req, res) => {
  // Step 1: Find the rental first
  const rental = await Rental.findById(req.params.rid);


  if (!rental) {
    res.status(404);
    throw new Error("Rental not found");
  }

  // Step 2: Update the car's isbooked to false
  const car = await Car.findByIdAndUpdate(rental.car , {isBooked : false} , {new : true});



  // Step 3: Delete the rental
  const deletedRental = await Rental.findByIdAndDelete(req.params.rid);

  if (!deletedRental) {
    res.status(400);
    throw new Error("Rental not deleted");
  }

  res.status(200).json({
    id: deletedRental._id,
    msg: "Rental deleted and car marked as available again",
  });
});


module.exports = {getAllRents,updateRental,addRent,getOwnRent,deleteRental}
