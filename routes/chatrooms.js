
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/schema');
var database = require('../model/database');
var chatroom = mongoose.model('ChatRoom');

/* GET users listing. */
router.get('/get', function(req, res, next) {
    schema.ChatRoom.find({}).exec(function (err, chatrooms) {
        if (err)
            return console.error(err);
        console.log("Load success: ", chatrooms);
        res.send(chatrooms);
    });

});

router.post('/post', function(req, res, next) {
      var instance = new schema.ChatRoom(req.body);
      schema.ChatRoom.find({}).sort({_id:-1}).skip(10).exec(function (err, chatrooms) {
          if (err)
              return console.error(err);
          console.log("Loader success: ", chatrooms);
          chatrooms.forEach(function(chatroom){
              console.log("Loader success: ", chatroom);
              schema.ChatRoom.findByIdAndRemove(chatroom._id).exec();
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
    schema.ChatRoom.find({}).exec(function (err, chatrooms) {
        if (err)
            return console.error(err);
        //console.log("Load success: ", users);
        var toNotify = client?new Array(client):router.clients;
        toNotify.forEach(function(socket){
            socket.emit('getChatrooms', chatrooms);
        })
    });
}

module.exports = router;
