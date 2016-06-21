var express = require('express');
var router = express.Router();
var db = require('../db/api');
var auth = require('../passport');

function isLoggedIn(req,res,next) {
  if (req.session.userId) {
    res.redirect('/home')
  } else {
    next()
  }
}

router.get('/home', function(req, res, next) {
  db.getUser(req.session.userId).then(function (user) {
    res.render('home', {user: user});
  })
});

router.use(isLoggedIn);

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/login', function(req, res, next) {
  auth.passport.authenticate('local',
  function (err, user, info){
    if(err) return next(err);
    console.log("THIS?", user);
    if(user) {
      req.session.userId = user.id;
      res.redirect('/')
    } else {
      next('Invalid Login');
    }
  })(req, res, next);
});

router.post('/signup', function(req, res, next) {
  db.findUserByUsername(req.body.username).then(function(user){
    res.render('signup', {error: "username in use"})
  }).catch(function(err){
    if(err.notFound) {
      auth.createUser({
        username: req.body.username,
        password: req.body.password,
      }).then(function(id){
        req.session.userId = id;
        res.redirect('/');
      }).catch(function(err){
        next(err);
      });
    } else {
      next(err);
    }
  });
});

router.get('/logout', function(req, res, next) {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
