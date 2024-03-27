const express = require('express');
const router = express.Router();

const User = require('./models/User.js');

router.get('/register', async (req, res) => {
    let user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(req.body.passw0rd !== req.bodu.password_confirm || user){
        res.redirect('/register');
    } else {
        
    }
})