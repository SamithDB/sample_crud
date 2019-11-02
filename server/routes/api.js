//Use ExpressJS
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
var sql = require("mssql");

// Configuration object for your database
var config = {
    user: 'sa',
    password: 'sam@cinglevue123',
    server: 'localhost', 
    database: 'sample_crud' 
};

//SECRET FOR JSON WEB TOKEN
let secret = 'samith';
//ALLOW PATHS WITHOUT TOKEN AUTHENTICATION
router.use(expressJWT({ secret: secret})
    .unless(
        { path: [
            '/api/auth'
        ]}
  ));

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

//JWT
router.post('/auth', function(req, res) {
  const body = req.body;
  var user_id;
  var uname;
  var password;
  // connect to the database
  sql.close();
  sql.connect(config, function (err) {
    
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();
      console.log(body.username);
      // query to the database and get the records
      request.query("select * from user_login WHERE uname = '"+body.username+"'", function (err, userset) {
          
          if (err){console.log(err)}else{
            user_id = userset.recordset[0].id_user_login;
            uname = userset.recordset[0].uname;
            password = userset.recordset[0].password;
            console.log("--------");
            console.log(userset);
              if(body.username == uname && body.password == password){
                  var token = jwt.sign({userID: user_id}, 'samith', {expiresIn: '2h'});
                  res.send({token});
              }else{
                  return res.sendStatus(401);
              }
            sql.close();
          } 
      });
  });
});

// Get users
router.get('/users', (req, res) => {
    // connect to the database
    sql.close();
    sql.connect(config, function (err) {
    
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from user_login', function (err, userset) {
            
            if (err) console.log(err)
            // send records as a response
            res.send(userset.recordset);
            //console.log(userset.recordset);
            sql.close();
        });
    });

});

//Save User
router.post('/saveuser', (req, res) => {
    const body = req.body;

    // connect to the database
    sql.close();
    sql.connect(config, function (err) {
      
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query("INSERT INTO user_login (name, uname, email, password) values ('"+body.name+"','"+body.uname+"','"+body.email+"','"+body.pass+"')", function (err, proset) {
            
            if (err){
                console.log(err)
            }else{
                console.log(proset);
                sql.close();
                res.status(200).json({"success": true});
            }
        });
    });
    
    
});

// Get Products
router.get('/products', (req, res) => {
    // connect to the database
    sql.close();
    sql.connect(config, function (err) {
    
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from product', function (err, recordset) {
            
            if (err) console.log(err)
            // send records as a response
            //console.log(recordset.recordset);
            res.send(recordset.recordset);
            
        });
    });

});

//Save Products
router.post('/saveproduct', (req, res) => {
    const body = req.body;

    // connect to the database
    sql.close();
    sql.connect(config, function (err) {
      
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query("INSERT INTO product (name, qty, price) values ('"+body.name+"','"+body.qty+"','"+body.price+"')", function (err, proset) {
            
            if (err){
                console.log(err)
            }else{
                console.log(proset);
                sql.close();
                res.status(200).json({"success": true});
            }
        });
    });
});

//Delete Products
router.post('/deleteproduct', (req, res) => {
    console.log("Deleting");
    const body = req.body;

    // connect to the database
    sql.close();
    sql.connect(config, function (err) {
      
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query("DELETE FROM product WHERE id_product = '"+body.id+"'", function (err, proset) {
            
            if (err){
                console.log(err)
            }else{
                console.log(proset);
                sql.close();
                res.status(200).json({"success": true});
            }
        });
    });
});

//Update Products
router.post('/updateproduct', (req, res) => {
    const body = req.body;

    // connect to the database
    sql.close();
    sql.connect(config, function (err) {
      
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query("INSERT INTO product (name, qty, price) values ('"+body.name+"','"+body.qty+"','"+body.price+"')", function (err, proset) {
            
            if (err){
                console.log(err)
            }else{
                console.log(proset);
                sql.close();
                res.status(200).json({"success": true});
            }
        });
    });
});

module.exports = router;