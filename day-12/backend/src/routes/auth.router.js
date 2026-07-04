const express = require("express")
const app = require("../app")
const authRouter = express.Router()
const userModel =require("../models/user.model")
const jwt = require("jsonwebtoken")

// to register uer 
// POST with stattus 201
authRouter.post("/register",async (req,res)=>{
    const {name,email,password} =req.body

    // for checking is user already exits
    const isUserAlreadyExist  = await userModel.findOne({email})
    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"email already registered"
        })
    }

    const user = await userModel.create({
        name,email,password
    })

    // token 
    const token = jwt.sign({
        id:user._id,
        email:user.email
    },
    process.env.JWT_SECRET
)

res.cookie("jwt_token",token)


    // status for respons
    res.status(201).json({
        message:"user register successfully",
        user,
        token
    })

})


module.exports = authRouter