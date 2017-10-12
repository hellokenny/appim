var Utils = require("../lib/Utils");
var Const = require("../const");
var Settings = require("../lib/Settings");
var UserModel = require("../Models/UserModel");
var MessageModel = require("../Models/MessageModel");
var DatabaseManager = require("../lib/DatabaseManager");
var UsersManager = require('./UsersManager');
var RoomManager = require('./RoomsManager');
var async = require('async');
var _ = require('lodash');
var moment = require('moment');

var RoomLogic = {
    add : function(param,onSuccess,onError){
        console.log("---------------RoomLogic add-------------");
        console.log(param);

        var name = param.name;
        var members = param.members;
        var arrMembers = [];
        var ownerId = param.ownerId;

        if(Utils.isEmpty(name)){

            if(onError)
                onError(null,Const.resCodeParamError);

            return;

        }

        if(Utils.isEmpty(members)){

            if(onError)
                onError(null,Const.resCodeParamError);

            return;

        }

        arrMembers = members.split(',');

        if(Utils.isEmpty(ownerId)){

            if(onError)
                onError(null,Const.resCodeParamError);

            return;

        }

        var newRoom = new DatabaseManager.roomModel({
            name : name,
            members : arrMembers,
            ownerId : ownerId,
            createTime : new Date()
        });

        newRoom.save(function (err,room) {
            if(err){

                if(onError)
                    onError(err,null);

            }else{


                console.log("---------------[RoomLogic]dbreturnroom-------------")

                console.log(room);

                RoomManager.addRoom(room._id,room.name,room.ownerId,room.members,room.members);

                //将房间内的人员加入socket分组
                arrMembers.forEach(function (uId) {

                    console.log("---------------[RoomLogic]newRoomSave-------------")

                    console.log(uId);
                    var user = UsersManager.users[uId];
                    if(user!=null){

                        console.log("---------------[RoomLogic]newRoom-------------")

                        console.log(newRoom);

                        console.log("---------------[RoomLogic]room-------------")

                        console.log(room);

                        user.socket.join(room._id.toString());
                        RoomManager.enterRoom(room._id.toString(),uId);
                    }

                });




                if(onSuccess)
                    onSuccess({
                        room: room
                    });
            }
        });

    }
}

module["exports"] = RoomLogic;