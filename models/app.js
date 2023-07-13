const mongoose = require("mongoose");

const empSchmena = mongoose.Schema({

    firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      department: {
        type: String,
        enum: ['Tech', 'Marketing', 'Operations'],
        required: true,
      },
      salary: {
        type: Number,
        required: true,
      },


},{
  versionKey:false
});

const empModel = mongoose.model("emp", empSchmena);

module.exports = {
  empModel
};