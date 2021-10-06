const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');

// router.get('/fakeuser', async(req,res)=>{
//     const user = new User({
//         username: "Ishika",
//         email :'ishika@gmail.com'
//     });
//     const newUser = await User.register(user,'12345678');
//     res.send(newUser);
// })

router.get('/register',(req,res)=>{
    res.render('auth/signup');
})

router.post('/register', async(req,res)=>{
    try{
        const {username,email,password} = req.body;
        const user = new User({
            username: username,
            email:email,
        });
        await User.register(user,password);
        req.flash('success',`Welcome ${username}, Please login to continue`);
        res.redirect('/products');
    } catch(e){
        req.flash('error',e.message);
        res.redirect('/register');
    }
})

router.get('/login', (req,res)=>{
    res.render('auth/login');
})

router.post('/login',
passport.authenticate('local',
{
    failureRedirect: '/login',
    failureFlash: true
}), (req,res)=>{
    const {username} = req.user
    req.flash('success',`Welcome come back ${username} Again!!`);
    res.redirect('/products');
})

router.get('/logout', (req,res)=>{
    req.logout();
    req.flash('success','Logout successfully');
    res.redirect('/login');
})


module.exports = router;