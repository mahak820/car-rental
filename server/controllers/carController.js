const expressAsyncHandler = require("express-async-handler")
const Car = require("../models/carModel")

const getcars = expressAsyncHandler (async(req,res) =>{
   
    const cars = await Car.find()
    if (!cars){
        res.status(404)
        throw new Error("cars not found")
    } 
    res.status(200).json(cars)

})
const getcar = async(req,res) =>{
 const car = await Car.findById(req.params.id)
 if (!car){
    res.status(404)
    throw new Error("car not found")
} 
res.status(200).json(car)

}

module.exports = {getcar,getcars}