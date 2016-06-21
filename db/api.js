var knex = require('./knex')

module.exports = {
  findUserByUsername: function (username) {
    return knex('users').where('username', username).first()
    .then(function(user){
      if(user) {
        return user;
      } else {
        return Promise.reject({notFound:true});
      }
    }).catch(function(err) {
      return Promise.reject(err);
    });
  },
  addUser: function (user) {
    return knex('users').insert(user, 'id')
  },
  getUser: function (id) {
    return knex('users').where({id: id}).first()
  }
}
