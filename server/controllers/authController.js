const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const registerUser = expressAsyncHandler( async (req,res) =>{


// check all fields are coming in req.body
const {name, phone ,password, email} = req.body

if(!name|| !password|| !email|| !phone  ){
    res.status(400);
    throw new Error("please fill all details!!")
    // express ka khudka error handler syntax upper hai
}

const emailExist = await User.findOne({email : email})
const phoneExist = await User.findOne({phone : phone})

if(emailExist || phoneExist){
  res.status(400);
  throw new Error("User already exist !!")
}


// hash password 
const salt = bcrypt.genSaltSync(10)
const hashedPassword = bcrypt.hashSync(password,salt)
 
// create new user
const user = await User.create({
    name,email,password : hashedPassword,phone
})
if(!user){
    res.status(400)
    throw new Error("user not created!")
}


    res.status(201).json({
        name : user.name,
        email : user.email,
        id : user._id,
        isAdmin : user.isAdmin ,
        token : generateToken(user._id)
    })
});



const loginUser = expressAsyncHandler(  
    async (req,res) =>{

        // check all fields are coming in req.body
    const {password, email} = req.body
    
    if( !password|| !email ){
        res.status(400);
        throw new Error("please fill all details!!")
        // express ka khudka error handler syntax upper hai
    }
    const user = await User.findOne({email})

    if (user && await bcrypt.compare(password, user.password)){
        res.status(200).json({
            id : user._id ,
            name: user.name ,
            email :user.email ,
            isAdmin : user.isAdmin ,
            token: generateToken(user._id)

        })
       
    }else{
        res.status(400);
        throw new Error("Invalid credetials")
    }
    
       
    }
)

const privateController = expressAsyncHandler( async(req,res) => {
res.json(req.user)
})

const generateToken = (id) => {
    return jwt.sign({id : id } , process.env.JWT_secret , { expiresIn: "30d" });

}


module.exports = {loginUser,registerUser,privateController}