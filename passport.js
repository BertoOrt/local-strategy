var bcrypt = require('bcrypt');
var passport = require('passport');
var db = require('./db/api');

var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function(username, password, done) {
    console.log('Logging in...')
    db.findUserByUsername(username).then(function(user){
      if(user &&  bcrypt.compareSync(password, user.password)) {
        return done(null, user);
      } else {
        return done(new Error('Invalid Email or Password'));
      }
    }).catch(function(err){
      return done(err);
    })
}));

function createUser(user) {
  var hash = bcrypt.hashSync(user.password, 8);
  user = {
    username: user.username,
    password: hash
  };
  return db.addUser(user).then(function(id) {
    return id[0];
  }).catch(function(err) {
    return Promise.reject(err);
  });
}

module.exports = {
  passport: passport,
  createUser: createUser,
}
