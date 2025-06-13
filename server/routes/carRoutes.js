const express = require('express')
const { getcar, getcars} = require("../controllers/carController")
const protect = require('../middleware/authMiddleWare')
const router = express.Router() 

router.get("/",getcars)
router.get("/:id",protect,getcar)


router.use("/:cid/reviews",require("./reviewRoutes"))
module.exports = router