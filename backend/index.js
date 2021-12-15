var mysql = require("mysql");
var bodyParser = require('body-parser')
var express = require("express");
var app = express();

app.use(express.json());
var JsonParser = bodyParser.json();

//app.use(express.urlencoded({ extended: false }));


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql123",
    database:"whatsmyzakat"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "Select * from user";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Selected");       
  });

});

  //
  app.get('/' , (req ,res) => {
    var sql = "INSERT INTO user (username , email , password) VALUES ('Negar' ,'negar@gmail.com' , 'negar123')";
    con.query(sql , (err , result) => {
        if(!err){
        res.send(result);
        console.log("Done!")
        }
    });
});

app.get('/api' , (req ,res) => {
    var sql = "SELECT * from user";
    con.query(sql , (err , result) => {
        if(!err){
        res.json(result);
        }
    });
});

app.post('/register' ,  (req , res) => {
  //res.send(req.body.email)
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  var sql = `INSERT INTO user (username , email , password) VALUES (? ,? , ?)`
  con.query(sql , [username , email , password] , (err , result) => {
    if(!err){
      console.log("Inserted");
    }
  })
  });

var samsi = "";
app.get('/api/signin/:id' , (req , res) => {
  var nam = req.params.id;
  samsi = nam;
 
  //var password = req.body.password;

  var sql = `SELECT username , password FROM user where username = ? `;
  con.query(sql ,[nam] , (err , result) => {
    if(err){
      console.log(err)
    }else{
      res.json(result)
      console.log("Done!")
    }
  })
});
console.log(samsi)
app.get('/dashboard' , (req , res) => {
  res.send("Home Page");
});

app.post('/api/cal/:id' , JsonParser, (req , res) => {
  var user = req.params.id;
  var assets = req.body.assets;
  var liablities = req.body.liablities;
  var total = req.body.total;
  //var date = req.body.date;

  var sql = `INSERT INTO calculator (assets , liablaties , total,username ) VALUES (? , ? , ? , ? )`;
  con.query(sql , [assets ,liablities ,total , user] , (err , result) => {
    if(!err){
      res.json('success')
      console.log("I m in ")
    }else{
      console.log(err)
    }
  })
});





app.get('/api/history/:id' , (req , res) => {
  var history = req.params.id;
  var sql = `SELECT assets , liablaties , total from calculator where username = ?`;
  con.query(sql , [history] ,(err , result) => {
      if(!err){
      res.json(result);
      }
  });
});

app.get('/history/:id' , (req , res) => {
  res.send("history1");
});



app.listen(3001);