const express = require("express");
const { connection } = require('./db');
const cors = require("cors");
require("dotenv").config();
const { userRouter } = require("./routes/user");
const { empRouter } = require("./routes/emp");

const app = express();
app.use(express.json());
app.use(cors());





app.use("/", userRouter);
app.use("/dashboard", empRouter);




app.listen(process.env.port, async () => {
  try {
    await connection;

    console.log("*****************Connected to server*****************");
  } catch (error) {
    console.log("Not connected", error);
  }
});