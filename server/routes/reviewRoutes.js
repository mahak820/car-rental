

const express = require('express');
const { getAllCarReviews, addAllCarReview, updateAllCarReview } = require('../controllers/reviewController');
const protect = require('../middleware/authMiddleWare');

const router = express.Router({mergeParams : true})
 
 router.get('/' ,protect, getAllCarReviews)
 router.post('/add' ,protect, addAllCarReview)
 router.put('/:id',protect,updateAllCarReview)


 module.exports = router;