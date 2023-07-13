const express = require("express");
const mongoose=require("mongoose")
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user");
const userRouter = express.Router();
require("dotenv").config();


//*****************************************(Register)**************************************** */



userRouter.post('/signup', async (req, res) => {
   
    try {
        const { email, password, confirm_password } = req.body;
        const isPresent = await UserModel.findOne({ email });
        if (isPresent)
        {
          return res.status(400).send({
            msg: "User already registered",
          });
        }
        if(password!=confirm_password)
        {
            return res.status(400).send({
                msg: "Password mismatch",
              });
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            const user = new UserModel({
              email,
              password: hash,
              confirm_password: hash
            });
            await user.save();
            res.status(201).send({ msg: "Registeration Successfull" });
          
        });
      }
       catch (error) {
        res.status(400).send({
          msg: "Error Occured", error
        });
      }
    });




  //*********************************************(Login)*********************************** */




  userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('Invalid credentials, Please register first');
    }
    bcrypt.compare(password, user.password, function(err,result){
        if(result)
        {
            const token = jwt.sign({ userId: user._id }, 'krunal', {expiresIn:"3hr"});
        }
        else
        {
            return res.status(401).send('Wrong credentials'); 
        }
    })
    } catch (err) {
        res.status(401).send('Error Occured')
    }
  });








module.exports = {
    userRouter,
  };