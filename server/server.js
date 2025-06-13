const express = require("express")
const colors = require("colors")
const connect_db = require("./config/db_config")
const errorHandler = require("./middleware/errorHandler")
require("dotenv").config()
const app = express()
const port = process.env.PORT || 5000

// default route
app.get("/",(req,res)=>{
  res.json ({
    mssg : "WELCOME TO CAR RENTAL API 1.0.....",
  })  
});

// db connection
connect_db();


// request me jo payload ata hai vo read karta hai express server vo directly jason me read nhi kar pata hai toh hum middleware use karte hai
// body parser
app.use(express.json())
app.use(express.urlencoded({extended :true}))

// auth routes
app.use("/api/auth", require("./routes/authRoutes"));

// car routes
app.use("/api/car",require("./routes/carRoutes"));

// rentals routes
app.use('/api/rentals',require("./routes/rentRoutes"))

// admin routes
app.use('/api/admin',require("./routes/adminRoutes"))

// error handler
app.use(errorHandler)
app.listen(port,() => console.log(`Server is running at port : ${port}`.green));

