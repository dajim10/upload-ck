// import express from 'express'
// import multer from 'multer'
// import cors from 'cors';
// import bodyParser from 'body-parser'
// import mysql from 'mysql2'
// import dotenv from 'dotenv'
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser')
const mysql = require('mysql2')

require('dotenv').config();

const port = process.env.port;
console.log(process.env.HOST)
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}))

console.log(process.env.PORT)

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'miscwcmc326442',
  database: 'sdgs',
  
})


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.split(".");
    ext = ext[ext.length - 1];
    cb(null, `${Date.now()}.${ext}`);
  }
});
const upload = multer({ storage: storage });
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use([
  express.static("public"),
  express.json(),
  cors(),
  upload.array("files")
]);

app.post("/upload_files", (req, res) => {
  // console.log(req.body);
  if (req.files.length > 0) {
    res.json(req.files[0]);
  }
});


app.get("/sdgs", (req, res) => {
  conn.query("SELECT * FROM sdg_goal", (err, result) => {
    if (err) throw err;
    res.send(result)
  })
})


app.listen(3000, () => {
  console.log(`Server started...`);
});