//Use ExpressJS
const express = require('express');
const router = express.Router();
//var Connection = require('tedious').Connection;
var sql = require("mssql");
// Configuration object for your database
var config = {
    user: 'sa',
    password: 'sam@cinglevue123',
    server: 'localhost', 
    database: 'sample_crud' 
};

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

module.exports = router;