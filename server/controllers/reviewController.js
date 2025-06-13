 const expressAsyncHandler = require("express-async-handler")

 const Review = require("../models/reviewModel")


 // Get all reviews for a car
const getAllCarReviews = expressAsyncHandler (async  (req,res) =>{
   const review = await Review.find({car : req.params.cid})
   if (!review){
      res.status(404)
      throw new Error("reviews not found")
   }
   res.status(200).json(review)
  })

  // Add a new review for a car
 const addAllCarReview = expressAsyncHandler (async  (req,res) =>{
   const {rating, comment} = req.body
   
   
   if (!rating || !comment){
     res.status(400)
     throw new Error(" fill all required fields")
   }
   const review = await Review.create({
      car : req.params.cid,
      user :req.user._id,
      rating,
      comment})

      const populatedReview = await review.populate([
         { path: "car", select: "name" },
         { path: "user", select: "name" },
       ]);

 

   res.status(201).json(populatedReview)
})
 const updateAllCarReview =expressAsyncHandler ( async  (req,res) =>{
   const {rating, comment} = req.body
   console.log(rating)
   console.log(comment)
   
   if (!rating || !comment){
     res.status(400)
     throw new Error(" fill all required fields")
   }
   const review = await Review.create({
      car : req.params.cid,
      user :req.user._id,
      rating ,
      comment})
      const populatedReview = await review.populate([
         { path: "car", select: "name" },
         { path: "user", select: "name" },
       ]);

 

   res.status(201).json(populatedReview)

 })
 
 module.exports = {getAllCarReviews,addAllCarReview,updateAllCarReview }