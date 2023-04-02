const express = require('express')
const router = express.Router()
const user = require('../models/Auth')
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const Jwt_Token = "Ali"
const { findById } = require('../models/Auth');
const fetchuser = require("../Authenticate/fetchUser")

// Endpoint 1: Creating a new user. Using POST request. No Login Required.
router.post('/signup',[    
body('email').isEmail(),
body('name').isLength({ min: 3 }),
body('password').isLength({ min: 5 }),
], async (req, res)=>{

try{    // console.log(req.body)
    // res.send("hlo")
    // const User = users(req.body)
    // User.save();

    const salt = await bcrypt.genSalt(4)
    const secPassword = await bcrypt.hash(req.body.password, salt)

   const User = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: secPassword
    })
    console.log(Jwt_Token)
    const token = jwt.sign({ id: User.id }, Jwt_Token);
    res.send({"authtoken":token})
    // const users = await User.findOne({email: req.body.email})
    // if(users){
    //   res.send("Account has already been created with this email")
    // }
  }
catch (error){
  res.status(500).send("Something went wrong")
}
}
)

// Endpoint 2: Login Endpoint. Using POST request. No login Requied.

router.post('/login',[
  body('email').isEmail(), async(req, res)=>{
    const {email, password} = req.body
    try {
      let User = await user.findOne({email})
      
      const passwordCompare = await bcrypt.compare(password, User.password)
      if(!passwordCompare){
        res.status(400).send("Please try with correct details")
      }
      
      // const emailCompare = await bcrypt.compare(email,User.email)
      // if(!emailCompare){
      //   res.status(400).send("Please try with correct details")}
      const data = {
        user:{
            id:user._id
        }
    }


        const token = jwt.sign({ id: User.id }, Jwt_Token);
        res.send({"authtoken":token})
      
    } catch (error) {
      res.status(500).send("Something went wrong")
    }
  }
])

// Endpoint 3: Verifying User. Using POST request. Login Requied.
router.post('/getuser', fetchuser, async (req, res)=>{
  try {
    userId = req.user.id
    const User = await user.findById(userId).select("-password")
    res.send(User)
  } catch (error) {
    res.status(500).send("Something went wrong")
  }
})
module.exports = router