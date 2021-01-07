const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql= require("mysql");
const { urlencoded } = require("body-parser");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root145",
    database:"test"   
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//get request to select data
app.post("/api/get",(req,res) =>{
    const Name = req.body.nameUser;
    const Password = req.body.password;
    console.log("Name.."+ Name + Password);
    // const sqlInsert= "SELECT * FROM pdotable where name=?, password=?"; 
  
    db.query("SELECT * FROM pdotable where name=? AND password=?",[Name,Password],(err,result)=>{
        if(err){
            console.log(err);      
        }else{
            if(result.length > 0){
                res.send('pass');      
            }else{
                 res.send({message: "Wrong UserName/Password !"});      
            }
        }        
       
  }); 
});

// post request to insert data
app.post("/api/insert",(req,res) => {
      
    const Name = req.body.nameUser; 
    const Password = req.body.password;

    bcrypt.hash(Password,saltRounds,(err, hash)=>{
        if(err){
            console.log(err);
        }

        const sqlInsert= "INSERT INTO `pdotable`(`name`,`password`) VALUES(?,?)"; 
        db.query(sqlInsert,[Name , hash],(err,result)=>{
          //  console.log("Error:"+err);
          //  console.log(result);      
        }); 
    })  
});

//put request to update data
app.put("/api/update",(req,res) => {
      
    const Id = req.body.id;
    const Name = req.body.nameUser;
    const Password = req.body.password;
    
    const sqlUpdate= "UPDATE `pdotable` SET `name`=? , `password`=? WHERE `id`=?"; 
  db.query(sqlUpdate,[Name , Password, Id],(err,result)=>{
      console.log("Error:"+err);
      console.log(result);
      
  }); 
});

// delete request to delete data
app.delete("/api/delete/:id",(req,res) => {      
    const Id = req.params.id;
   
    const sqlDelete= "DELETE FROM `pdotable` WHERE `id`=?"; 

  db.query(sqlDelete, Id, (err, result) => {
      console.log("Error:"+err);
      console.log(result);      
  }); 
});

app.listen(3001,()=>{
    console.log("running on port 3001");
});


