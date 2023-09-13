const express = require("express");
const router = express.Router();
const Student = require("../model/studentmodel");

router.get("/login", (req, res) => {
  res.render("student/login");
});
router.post("/login", async (req, res) => {

    const StudentName = req.body.name;
    const RollNo = req.body.roll;
    console.log(RollNo,"my data");
    const individualStudent = await Student.findOne({roll : RollNo});
    console.log("fecthed data",individualStudent);
    if(!individualStudent){
      res.render("student/login", {
        error : "User does not exit please add the user details!"
      })
    }
    res.render("student/view", { one : individualStudent})
});

module.exports = router;
