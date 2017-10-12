var Utils = require("../lib/Utils");
var Const = require("../const");
var Settings = require("../lib/Settings");
var MessageModel = require("../Models/MessageModel");
var RoomsManager = require('./RoomsManager');
var DatabaseManager = require("../lib/DatabaseManager");
var async = require('async');
var _ = require('lodash');
var objectid = require('objectid');

var MessageLogic = {
    send:function (param,onSuccess,onError) {
        var rId = param.rId;
        var uId = param.uId;
        var msg = param.msg;
        var type = param.type;

        if(Utils.isEmpty(rId)){
            if(onError)
                onError(null,Const.resCodeParamError);

            return;
        }

        if(Utils.isEmpty(uId)){
            if(onError)
                onError(null,Const.resCodeParamError);

            return;
        }

        if(Utils.isEmpty(msg)){
            if(onError)
                onError(null,Const.resCodeParamError);

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

                    newMessage.save(function (err,room) {
                        if(err){

                            console.log("---------------newMessageSave-------------");

                            console.log(err);

                            if(onError)
                                onError(err,null);
                        }
                        else{
                            if(onSuccess)
                                onSuccess({

                                });
                        }
                    })


                }
            }
        ]);

    }
}

module["exports"] = MessageLogic;