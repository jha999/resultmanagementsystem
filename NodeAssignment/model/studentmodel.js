const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema({
  roll: {
    type : Number,
    unique : true
  },
  name:  {
    type : String,
    unique : true
  },
  dob :  Date,
  score: {
    type : Number,
    require : true
  },
});
module.exports = mongoose.model("Student", studentSchema);