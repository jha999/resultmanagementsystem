const express = require('express');
const router = express.Router();
const storage = require('node-sessionstorage');

const Student = require("../model/studentmodel");
const Teacherdata = require("../model/teachermodel");

router.get("/login", async(req, res) => {
    const data = await Teacherdata.find()
    
    storage.setItem('username', data);
 
    res.render("teacher/teacherLogin");
});

router.get("/landing" , async(req ,res) => {
    const allStudents = await Student.find()
    res.render("teacher/landing" , { student : allStudents });
});

router.post("/login", (req, res) => {
    
    var creds = storage.getItem('username');
    

     
    if(req.body.password == creds[0].password && req.body.email == creds[0].email){
        res.redirect("/teacher/landing");
    }
    else{
        res.render("teacher/teacherLogin", {
            error : "Please Enter Correct Creds !!"
        })
    }
});

router.get("/addstudent", (req, res) => {
    res.render("teacher/addstudent");
});

router.post("/addstudent" , async (req ,res) => {
    
    const singleStudent = new Student({
        roll : req.body.roll,
        name : req.body.name,
        dob : req.body.dob+"T00:00:00.000+00:00",
        score : req.body.score
    })
    try {
        const newStudent = await singleStudent.save();
        res.redirect("/teacher/addstudent");
      } catch {
        res.send("error")
    }
})

router.get("/edit/:id", async (req, res) => {
    const user = await Student.findById(req.params.id)

    res.render("teacher/edit", {user : user})
});

router.post("/edit/:id", async (req, res) => {
    const user = await Student.findByIdAndUpdate(req.params.id,req.body)
    res.redirect("/teacher/landing")
});

router.get("/delete/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id)
    res.redirect("/teacher/landing")
});


router.get("/logout" , (req , res) => {
    storage.removeItem('username');
    res.redirect("/");
});
module.exports = router;