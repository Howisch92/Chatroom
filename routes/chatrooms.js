
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/schema');
var database = require('../model/database');
var chatroom = mongoose.model('ChatRoom');

router.get('/get', function(req, res, next) {
    schema.ChatRoom.find({}).exec(function (err, chatrooms) {
        if (err)
            return console.error(err);
        res.send(chatrooms);
    });
});

router.post('/post', function(req, res, next) {
      var instance = new schema.ChatRoom(req.body);
      schema.ChatRoom.find({}).sort({_id:-1}).skip(10).exec(function (err, chatrooms) {
          if (err)
              return console.error(err);
          chatrooms.forEach(function(chatroom){
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

  router.post('/postMessage', function(req, res, next) {
    var instance = new schema.ChatRoom(req.body);
    schema.ChatRoom.findById(instance._id).exec(function (err, chatroom) {
        chatroom.messages = instance.messages;
        chatroom.save(function (err, chatR){
            result = err?err:chatR;
            res.send(result);
            router.notifyclientsNewMsg(instance._id);
            return result;
        });
    });
});

router.post('/postUser', function(req, res, next) {
    var instance = new schema.ChatRoom(req.body);
    schema.ChatRoom.findById(instance._id).exec(function (err, chatroom) {
        chatroom.users = instance.users;
        chatroom.save(function (err, chatR){
            result = err?err:chatR;
            res.send(result);
            router.notifyclientsNewUser(instance._id);
            return result;
        });
    });
});

router.post('/deleteUser', function(req, res, next) {
    var instance = new schema.ChatRoom(req.body);
    schema.ChatRoom.findById(instance._id).exec(function (err, chatroom) {
        chatroom.users = instance.users;
        chatroom.save(function (err, chatR){
            result = err?err:chatR;
            res.send(result);
            router.notifyclientsNewUser(instance._id);
            return result;
        });
    });
});

router.clients = [];
router.addClient = function (client) {
    router.clients.push(client);
    router.notifyclients(client);
    router.notifyclientsNewMsg(client);
};
router.notifyclients = function (client) {
    schema.ChatRoom.find({}).exec(function (err, chatrooms) {
        if (err)
            return console.error(err);
        var toNotify = client?new Array(client):router.clients;
        toNotify.forEach(function(socket){
            socket.emit('getChatrooms', chatrooms);
        })
    });
}
router.notifyclientsNewMsg = function (_id,client) {
    schema.ChatRoom.findById(_id).exec(function (err, chatroom){
        if (err)
            return console.error(err);
        var toNotify = client?new Array(client):router.clients;
        toNotify.forEach(function(socket){
            socket.emit('getMsgForSpecificChat', chatroom.messages);
        })
    });
}
router.notifyclientsNewUser = function (_id,client) {
    schema.ChatRoom.findById(_id).exec(function (err, chatroom){
        if (err)
            return console.error(err);
        var toNotify = client?new Array(client):router.clients;
        toNotify.forEach(function(socket){
            socket.emit('getUsersForSpecificChat', chatroom.users);
        })
    });
}

module.exports = router;
