const express = require('express')
const { getAllUserRentals, getAllUserReviews, addCar, updateCar, deleteCar } = require('../controllers/adminController')
const adminProtect = require('../middleware/carMiddleware')
const router = express.Router()



router.get("/rentals" ,adminProtect,getAllUserRentals)
router.get("/reviews",adminProtect ,getAllUserReviews)
router.post("/car",adminProtect,addCar)
router.put("/car/:cid",adminProtect,updateCar)
router.delete("/car/:cid",adminProtect,deleteCar)

module.exports = router;