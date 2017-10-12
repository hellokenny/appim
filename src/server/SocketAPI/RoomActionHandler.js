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

var RoomActionHandler = function(){

}

_.extend(RoomActionHandler.prototype,SocketHandlerBase.prototype);

RoomActionHandler.prototype.attach = function(io,socket){

    var self = this;

    socket.on('addmember', function(param){

        console.log('addmember');
        console.log(param);

        var rId = param.rId;
        var inviterId = param.inviterId;
        var invitedIds = param.invitedIds;
        var arrInvitedIds = [];

        if(Utils.isEmpty(rId)){
            socket.emit('socketerror',{code:Const.resCodeParamError});
            return;
        }

        if(Utils.isEmpty(inviterId)){
            socket.emit('socketerror',{code:Const.resCodeParamError});
            return;
        }

        if(Utils.isEmpty(invitedIds)){
            socket.emit('socketerror',{code:Const.resCodeParamError});
            return;
        }

        arrInvitedIds = invitedIds.split(',');

        async.waterfall([
            function (done) {
                //获取房间信息
                RoomModel.model.findById(rId,function (err,room) {
                    done(err,rId,room);
                });
            },
            function (rId,room,done) {
                if(Utils.isEmpty(room)){
                    socket.emit('socketerror',{code:Const.resCodeFail});
                    return;
                }
                else {
                    //更新db中房间成员信息
                    room.update({
                        members:room.members.concat(arrInvitedIds)
                    },{},function (err,data) {
                        done(err,rId);
                    });
                }
            },
            function (rId,done) {
                //更新内存中房间成员信息，将用户加入socket分组
                var room = RoomsManager.rooms[rId];
                if(!Utils.isEmpty(room)){
                    arrInvitedIds.forEach(function (uId) {
                        //内存房间中添加成员
                        RoomsManager.addUser(rId,uId);
                        var user = UsersManager.users[uId];
                        if(!Utils.isEmpty(user)){
                            user.socket.join(rId);
                        }
                        else{
                            //内存房间中添加离线成员
                            RoomsManager.leaveRoom(rId,uId);
                        }
                    });
                    //发送进入房间通知消息
                    io.of(Settings.options.socketNameSpace).in(rId).emit('news',{code:Const.resCodeSucceed,data:param});
                }

            }
        ],
            function (err,data) {
                if(err){
                    socket.emit('socketerror',{code:Const.resCodeFail});
                }
                else{
                    socket.emit('socketerror',data);
                }
            });

    });

}


module["exports"] = new RoomActionHandler();