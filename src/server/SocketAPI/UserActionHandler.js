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

var UserActionHandler = function(){

}

_.extend(UserActionHandler.prototype,SocketHandlerBase.prototype);

UserActionHandler.prototype.attach = function(io,socket){

    var self = this;

    /**
     * @api {socket} "login" Login to the room
     * @apiName Login to room
     * @apiGroup Socket
     * @apiDescription Login to room
     * @apiParam {string} roomID Room ID
     *
     */
    socket.on('login', function(param){

        if(Utils.isEmpty(param.ac)){
            socket.emit('socketerror', {code:Const.resCodeParamError});
            return;
        }

        async.waterfall([

                function (done) {

                    //获取用户信息
                    UserModel.findByAc(param.ac,function (err,user) {

                        done(err,user);

                    });

                },
                function (user,done) {

                    if(user == null){

                        done("err");

                    }
                    else {

                        //获取用户所属房间信息
                        RoomModel.findByUserId(user._id,function (err,rooms) {
                            done(err,user,rooms);
                        });

                    }
                },
                function (user,rooms,done) {
                    //将用户加入内存
                    UsersManager.addUser(user._id,user.name,user.avatar,socket);

                    //加入房间分组
                    if(rooms != null && rooms.length>0){

                        rooms.forEach(function (room) {

                            var objRoomId = room._id;
                            var strRoomId=objRoomId.toString();

                            socket.join(strRoomId);

                            io.of(Settings.options.socketNameSpace).to(strRoomId).emit('news', {code:Const.resCodeSucceed,data:{user:user,room:room}});

                            if(_.isUndefined(RoomsManager.rooms[room._id])){
                                RoomsManager.addRoom(room._id,room.name,room.ownerId,room.members,room.members);
                            }
                            RoomsManager.enterRoom(room._id,user._id.toString());

                        });
                    }


                }
            ],
            function (err, data) {

                if(err){

                    socket.emit('socketerror', {code:Const.resCodeFail});

                }else{

                    socket.emit('socketerror', data);

                }

            }

        );

    });


    socket.on('logout', function(param){

        if(Utils.isEmpty(param.uId)){
            socket.emit('socketerror', {code:Const.resCodeParamError});
            return;
        }

        UsersManager.removeUser(param.uId);

        RoomModel.findByUserId(param.uId,function (err,rooms) {
            if(err)
                socket.emit('socketerror',{code:Const.resCodeFail});

            //离开房间分组
            if(rooms != null && rooms.length>0){

                rooms.forEach(function (room) {

                    var objRoomId = room._id;
                    var strRoomId=objRoomId.toString();

                    socket.leave(strRoomId);

                    io.of(Settings.options.socketNameSpace).to(strRoomId).emit('news', {code:Const.resCodeSucceed,data:{uId:param.uId,room:room}});

                    RoomsManager.leaveRoom(room._id,param.uId);

                });
            }

        })


    });

}


module["exports"] = new UserActionHandler();