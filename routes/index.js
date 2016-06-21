var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/home', function(req, res, next) {
  res.render('home');
});

router.get('/login', function(req, res, next) {
  res.render('auth/login');
});

router.get('/signup', function(req, res, next) {
  res.render('auth/signup');
});

router.post('/login', function(req, res, next) {
  res.redirect('/');
});

router.post('/signup', function(req, res, next) {
  res.redirect('/');
});

router.get('/logout', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
