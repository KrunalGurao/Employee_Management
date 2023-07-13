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




  userRouter.post('/login',async(req,res)=>{
    const {email,password}= req.body;
    let user=await UserModel.find({email});
    try {
        if(user.length>0){
            bcrypt.compare(password,user[0].password,async(err,result)=>{
                if(err)
                throw err;
                if(result){
                    let token=jwt.sign({"UserID":user[0]._id},"masai");
                    res.status(200).send({msg:"login successfull !",token})
                }else{
                    res.status(200).send({msg:"Wrong Credentials!"})
                }
            })
        }
        else if(user.length===0){
            res.status(201).send({msg:"Please registered first !"});
        }
    } catch (error) {
        res.send({msg:error.message})
        console.log(error)
    }
})







module.exports = {
    userRouter,
  };