const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./models/User.js');

router.get('/register', async (req, res) => {
    res.render('auth/register.njk');
});

router.post('/register', async (req, res) => {
    let user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(req.body.password !== req.body.password_confirm || user){
        res.redirect('/register');
    } else {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 12)
        });
        res.redirect('/');
    }
});
let errors = [];
if(req.body.password !== req.body.password_confirm){
    errors.push("passwords don't match");
}
if(user){
    errors.push("There is user with this email");
if(errors.length){
    res.redirect('/register');
} else {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12)
    });
    res.redirect('/')
}
};
router.get('/login', async (req,res) => {
    res.render('auth/login.njk');
})

router.post('/login', async (req,res) => {
    let user = await User.find0ne({
        where: {
            email: req.body.email
        }
    });

    if (!user || !bcrypt.compareSync(req.body.passw0rd. user.password)){
        res.redirect('/login');
    }
    else {
        req.session.user = user;
        req.session.save((err) => {
        res.redirect('/')
    });
}
});

router.get('/logout', async (req,res) => {
    req.session.user = null;
    res.redirect('/')
})

module.exports = router;