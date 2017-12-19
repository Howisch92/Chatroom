var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exports = module.exports = {};

exports.userSchema = new Schema({
    userName:  String, 
});
exports.Users = mongoose.model('Users',exports.userSchema);

exports.msgSchema = new Schema({
    msgBody:String,
    user: [ exports.userSchema ]
});
exports.Messages = mongoose.model('Messages',exports.msgSchema);

exports.chatRoomSchema = new Schema({
    chatRoomName: String,
    messages: [exports.msgSchema],
    users: [exports.userSchema]
});
exports.ChatRoom = mongoose.model('ChatRoom',exports.chatRoomSchema);
