var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/schema');
var database = require('../model/database');

/* GET users listing. */
router.get('/get', function(req, res, next) {
    schema.Messages.find({}).exec(function (err, messages) {
        if (err)
            return console.error(err);
        console.log("Load success: ", messages);
        res.send(messages);
    });

});

router.post('/post', function(req, res, next) {
      var instance = new schema.Messages(req.body);
      schema.Messages.find({}).sort({_id:-1}).skip(10).exec(function (err, messages) {
          if (err)
              return console.error(err);
          console.log("Loader success: ", messages);
          messages.forEach(function(message){
              console.log("Loader success: ", message);
              schema.Messages.findByIdAndRemove(message._id).exec();
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
    schema.Messages.find({}).exec(function (err, messages) {
        if (err)
            return console.error(err);
        //console.log("Load success: ", users);
        var toNotify = client?new Array(client):router.clients;
        toNotify.forEach(function(socket){
            socket.emit('getMessages', messages);
        })
    });
}

module.exports = router;
