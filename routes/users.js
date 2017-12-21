var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/schema');
var database = require('../model/database');

/* GET users listing. */
router.get('/get', function(req, res, next) {
    schema.Users.find({}).exec(function (err, users) {
        if (err)
            return console.error(err);
        res.send(users);
    });

});

router.post('/post', function(req, res, next) {
      var instance = new schema.Users(req.body);
      schema.Users.find({}).sort({_id:-1}).skip(10).exec(function (err, users) {
          if (err)
              return console.error(err);

              users.forEach(function(user){
              schema.Users.findByIdAndRemove(user._id).exec();
          });
      });
        instance.save(function (err, User) {
          result = err?err:User;
          res.send(result);
          router.notifyclients();
          return result;
      });
  });

router.clients = [];
router.addClient = function (client) {
    router.clients.push(client);
    router.notifyclients(client);
};
router.notifyclients = function (client) {
    schema.Users.find({}).exec(function (err, users) {
        if (err)
            return console.error(err);
        var toNotify = client?new Array(client):router.clients;
        toNotify.forEach(function(socket){
            socket.emit('getUsers', users);
        })
    });
}

module.exports = router;
