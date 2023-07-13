const express = require("express");
const mongoose=require("mongoose")
const cors = require("cors");
const { empModel } = require("../models/app");
const { userRouter } = require("./user");
const empRouter = express.Router();
require("dotenv").config();

  
  empRouter.post('/employees', async (req, res) => {
    try {
        const { firstName, lastName, email, department, salary } = req.body;
        const data = new empModel({
          firstName,
          lastName,
          email,
          department,
          salary,
        });
        await data.save();
        res.send('Employee added successfully');
    } catch (err) {
        return res.status(400).send("error occured")
    }
   
  });
  

//**************************************************************************************************** */


empRouter.get('/', async (req, res) => {
   
    try {
      
        const data = await empModel.find()
        res.status(200).send(data)

    } catch (error) {
      console.log(error);
      res.status(500).send('Error occured');
    }
  });


  //****************************************************************************************** */

 
  userRouter.delete("/employees/:id", async(req, res)=>{
    const {id} = req.params
try {
    await EmployeeModel.findByIdAndDelete({ _id: id })
        res.status(201).json({ message : ' emp data has been deleted' })
} catch (error) {
    console.log(error);
      res.status(500).send('Error occured');
}

  })


  //********************************************************************************************** */


empRouter.get('/employees', async (req, res) => {
    const { page, department, sort, name } = req.query;
    console.log(req.query,"query");
    let query = {};
    let sortValue = "";
    if (department) { query.department = department }
    if (sort === "asc") { sortValue = 1 }
    else
        if (sort === "asc") { sortValue = -1 }

    if (name) {
        query.firstName = { name :{$regex:name}};
    }
    try {
      
        const data = await empModel.find(query).sort({ salary: sortValue }).skip((page * 5) - 5).limit(5);
        res.status(200).send(data)

    } catch (error) {
      console.log(error);
      res.status(500).send('Error occured');
    }
  });


  //*************************************************************************************** */

empRouter.patch("/employees/:id",async(req, res)=>{
try {
    
    const payload= req.body
    const {id}= req.params
    const data= await empModel.findByIdAndUpdate({_id:id}, payload,{new:true})
    res.status(200).send("emp data has been updated")


} catch (err) {
    res.status(500).send('Error occured');
}

})


module.exports = {
    empRouter,
  };