const express = require('express');
const router = express.Router();



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
    user = [{"name":"John"},{"name":"Jane"}] 
    //console.log(user);
    res.json(user);
});

module.exports = router;