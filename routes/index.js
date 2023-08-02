var express = require('express');
var router = express.Router();
const User = require("../models/userModel")
const Work = require("../models/userModel1")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
// ============signin====================
router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Sign-In' });
});
router.post('/signin',async function(req, res, next) {
  try {
    const {username,password} =req.body;
    const user = await User.findOne({username});
    if(user == null){
      return res.send(`User not found. <a href="/signin">Sign-In</a>`)
    }
    if(password !== user.password){
      return res.send(`Incorrect password. <a href="/signin">Sign-In</a>`)
    }
    res.redirect("/profile")
  } catch (error) {
    res.send(error)
  }
});

// ===============signup==================
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Sign-Up' });
});
router.post('/signup',async function(req, res, next) {
  try {
    const newuser = new User(req.body);
    await newuser.save();
    res.redirect("/signin")
  } catch (error) {
    res.send(error)
  }
});
// =================profile====================
router.get('/profile', async function(req, res, next) {
  try {
    const tasks = await Work.find();
    const task = await Work.findById(req.params.id)
    res.render('profile', { title: 'Profile', tasks, task });
  } catch (error) {
    res.send(error) 
  }
});
// =========delete==========================
router.get('/delete/:id', async function(req, res, next) {
  try {
    await Work.findByIdAndDelete(req.params.id)
    res.redirect("/profile");
  } catch (error) {
    res.send(error) 
  }
});
// ===============update=========================
router.get('/update/:id', async function(req, res, next) {
  try {
    const task = await Work.findById(req.params.id);
    res.render("update" ,{
      title : "update-page",
      task,
      id : req.params.id
    })
  } catch (error) {
    res.send(error) 
  }
});
// ==============================================
router.post('/update/:id', async function(req, res, next) {
  try {
     await Work.findByIdAndUpdate(req.params.id , req.body);
    res.redirect("/profile")
  } catch (error) {
    res.send(error) 
  }
});

// ================add========================
router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Add-task' });
});
router.post('/add',async function(req, res, next) {
  try {
    const newtask = new Work(req.body);
    await newtask.save();
    res.redirect("/profile")
  } catch (error) {
    res.send(error)
  }
});


module.exports = router;
