var _ = require('lodash');
var UsersManager = require("../Logics/UsersManager");
var RoomsManager = require("../Logics/RoomsManager");
var DatabaseManager = require("../lib/DatabaseManager");
var Utils = require("../lib/Utils");
var Const = require("../const");
var SocketHandlerBase = require("./SocketHandlerBase");
var UserModel = require("../Models/UserModel");
var RoomModel = require("../Models/RoomModel");
var Settings = require("../lib/Settings");
var async = require('async');
var objectid = require('objectid');

var MessageActionHandler = function(){

}

_.extend(MessageActionHandler.prototype,SocketHandlerBase.prototype);

MessageActionHandler.prototype.attach = function(io,socket){

    var self = this;

    socket.on('sendmsg', function(param){

        var rId = param.rId;
        var uId = param.uId;
        var msg = param.msg;
        var type = param.type;

        console.log('---------------sendmsg param-------------');
        console.log(param);

        if(Utils.isEmpty(rId)){
            socket.emit('socketerror',{code:Const.resCodeParamError});
            return;
        }

        if(Utils.isEmpty(rId)){
            socket.emit('socketerror',{code:Const.resCodeParamError});
            return;
        }

        if(Utils.isEmpty(uId)){
            socket.emit('socketerror',{code:Const.resCodeParamError});
            return;
        }

        if(Utils.isEmpty(msg)){
            socket.emit('socketerror',{code:Const.resCodeParamError});
            return;
        }


        async.waterfall([
            function (done) {
                //获取房间信息
                var room = RoomsManager.rooms[rId];
                if(room!=null){
                    //保存消息数据
                    var newMessage = new DatabaseManager.messageModel({
                        _id:objectid(),
                        message:msg,
                        type:type,
                        senderId:uId,
                        sendTime:new Date(),
                        roomId:rId,
                        targets:room.members,
                        unreceiveds:room.offlines,
                        createTime:new Date()
                    });

                    console.log('---------------sendmsg newMessage-------------');
                    console.log(newMessage);

                    //发送消息
                    io.of(Settings.options.socketNameSpace).to(rId).emit('news', {code:Const.resCodeSucceed,data:{msg:newMessage}});

                    newMessage.save(function (err,room) {
                        if(err){

                            console.log("---------------newMessageSave-------------");

                            console.log(err);
                        }
                    })
                }
            }
        ]);

    });

}


module["exports"] = new MessageActionHandler();