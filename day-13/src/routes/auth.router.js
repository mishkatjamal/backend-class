const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/user.model");
const app = require("../app");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

// POST /api/auth/register
// register api
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // for checking the isEmailAlreadyExists
  const isEmailAlreadyExists = await userModel.findOne({ email });

  if (isEmailAlreadyExists) {
    return res.status(404).json({
      message: "email is already register",
    });
  }


  const hash = crypto.createHash("md5").update(password).digest("hex")
  // create user
  const user = await userModel.create({
    name,
    email,
    password:hash,
  });

  // token
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_cookie", token);

  res.status(200).json({
    message: "user register successfully",
    user,
  });
});

// POST /api/auth/protected
authRouter.post("/protected", (req, res) => {
  console.log(res.cookie);

  res.status(200).json({
    message: "cookies fetch",
  });
});

// POST /api/auth/login
// login api
// controller
authRouter.post("/login",async (req, res) => {
  const { email, password } = req.body;

  // user mila
  const user = await userModel.findOne({email})

  // agar user na mile to
  if (!user) {
    return res.status(404).json({
      message:"user not found"
    })
  }

  // password check karna user ka 
  const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")
  
  if (!isPasswordMatched) {
    return res.status(401).json({
      message:"wrong pssword"
    })
  } 

  // email pass sahi hua already register bhi hai to token set kar do cookie me
  const token = jwt.sign({
    id:user._id
  },process.env.JWT_SECRET)

  res.cookie("jwt_token",token)

  res.status(200).json({
    message:"user loggedin successfully"
  })


});

module.exports = authRouter;
