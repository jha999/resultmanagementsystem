const express = require('express');
const bodyParser = require("body-parser");
const app = require('express')();
const http = require('http').Server(app);
const storage = require('node-sessionstorage');

const mongoose = require('mongoose');

var expressLayouts = require('express-ejs-layouts');

mongoose.connect("mongodb+srv://jhagautam100:N1kxB35BQBWNg5LE@gautamcluster.nrrowyc.mongodb.net/?retryWrites=true&w=majority")

const teacher = require('./model/teachermodel');

async function insertteacher() {

    await teacher.create({
        email : 'teacher@gmail.com',
        password : 'teacher@123'
    })
}
//comment the below funtion after running this once it will seed above teacher cred into db.
//insertteacher();     

app.set('view engine', 'ejs');
//app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))
app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.use(express.json());

app.use(express.urlencoded());

const teacherRoutes = require("./routes/teacherlogin")

const studentRoutes = require("./routes/studentlogin");
const { log } = require('console');

app.use(function (req, res, next) {
  res.locals.user = storage.getItem('username');
  console.log("mydata is :",res.locals.user);
  next();
});

app.use("/teacher",teacherRoutes)

app.use("/student",studentRoutes)

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});

http.listen(3000 , function(){
    console.log('Server is running');
})

