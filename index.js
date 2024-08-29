
const mysql = require('mysql2');
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { render } = require('ejs');
const methodOverride = require("method-override");
const { connect } = require('http2');
const { v4: uuidv4 } = require("uuid");



// Databse Schema 


// CREATE DATABASE user;

// USE user;
 
//  CREATE TABLE help_center(
//  id VARCHAR(50) PRIMARY KEY,
//  title VARCHAR(50) NOT NULL,
//  description VARCHAR(500)  NOT NULL
//  );
 

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'user',
  password: "Nitesh@3925"
});
 

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));




app.get("/", (req,res)=>{
  res.send("server is running");
});


app.post("/cards", (req, res) => {
  let { title, description } = req.body;
  let id = uuidv4();
  res.redirect("/cards");
  //Query to Insert New User
  let q = `INSERT INTO help_center (id, title, description) VALUES ('${id}','${title}','${description}')`;
  
  try {
    connection.query(q, (err, result) => {
      if (!title || !description) {
        return res.status(400).send("Title and description are required.");
     }
      
    });
  } catch (err) {
    res.send("some error occurred");
    res.redirect("cards.ejs");
  }
});
app.get("/cards", (req,res)=>{
   let q = "SELECT * FROM help_center";
   try{
    connection.query(q,(err,users)=>{
      if(err) throw err;
      res.render("cards", {users});
    });
    }catch(err){
      console.log(err);
      res.send("some error in DB");
    }
  });
  


  app.get("/cards/:title", (req, res) => {
    let {title } = req.params;
    let q = `SELECT * FROM help_center  WHERE title  = '${title}'`;
  
    try {
      connection.query(q, (err, users) => {
        if (err) throw err;
        res.render("title", { users });
      });
    } catch (err) {
      res.send("some error with DB");
    }
  });
  
  

app.listen(port, ()=>{
  console.log(`app is listening to the port ${port}`);
});