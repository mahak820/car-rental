const express = require('express')
const { getAllRents, addRent, getOwnRent, updateRental,deleteRental } = require('../controllers/rentController')
const protect = require('../middleware/authMiddleWare')

const router = express.Router()

router.get("/", protect , getAllRents)
router.get("/:uid", protect ,getOwnRent)
router.post("/:cid",protect ,addRent)
router.put("/:rid",protect ,updateRental)
router.delete("/:rid",protect,deleteRental)
module.exports = router;