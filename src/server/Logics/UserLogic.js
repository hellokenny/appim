var Utils = require("../lib/Utils");
var Const = require("../const");
var Settings = require("../lib/Settings");
var UserModel = require("../Models/UserModel");
var MessageModel = require("../Models/MessageModel");
var DatabaseManager = require("../lib/DatabaseManager");
var async = require('async');

var UserLogic = {
    login : function(param,onSuccess,onError){
        var ac = param.ac;
        var name = param.name;
        var avatar = param.avatar;
        var startTime = param.startTime;

        if(Utils.isEmpty(ac)){

            if(onError)
                onError(null,Const.resCodeLoginNoAc);

            return;

        }

        if(Utils.isEmpty(name)){

            if(onError)
                onError(null,Const.resCodeLoginNoName);

            return;

        }

        if(Utils.isEmpty(avatar)){
            avatar = Settings.options.noAvatarImg;
        }

        async.waterfall([
            function (done) {
                //获取用户信息
                UserModel.findByAc(ac,function (err,user) {
                    done(err,user);
                })
            },
            function (user,done) {
                if(user == null){
                    // save to database
                    var newUser = new DatabaseManager.userModel({
                        ac:ac,
                        name:name,
                        avatar:avatar,
                        createTime:Date.now()
                    });
                    newUser.save(function (err,user) {
                        done(err,user);
                    });
                }
                else{
                    user.update({
                        name:name,
                        avatar:avatar
                    },{},function (err,userResult) {
                        done(err,user);
                    })
                }
            },
            function (user,done) {
                // 获取用户未读消息
                MessageModel.findUnreceivedByUerId(startTime,user._id,function (err,msgs) {
                    done(err,user,msgs);
                });
            },
            function (user,msgs) {
                //更新消息未读用户信息
                msgs.forEach(function (msg) {
                    var arr = msg.unreceiveds.slice(0);
                    _.pull(arr,user._id.toString());
                    msg.update({
                        unreceiveds : arr
                    });
                });

                if(onSuccess)
                    onSuccess({
                        user: user,
                        msgs: msgs
                    });
            }

        ],
            function (err,data) {
                if(err){
                    socket.emit('socketerror',{code:Const.responsecodeFail});
                }
                else{
                    socket.emit('socketerror',data);
                }
            }
        );

    }
}

module["exports"] = UserLogic;