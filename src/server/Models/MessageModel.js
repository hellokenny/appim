var mongoose = require('mongoose');
var Settings = require("../lib/Settings");
var Utils = require('../lib/Utils');
var _ = require('lodash');

var MessageModel = function(){

};

MessageModel.prototype.model = null;

MessageModel.prototype.init = function(){

    // Defining a schema
    var messageSchema = new mongoose.Schema({
        message: String,
        type: Number,
        senderId:String,
        sendTime:Date,
        roomId:String,
        targets:[String],
        unreceiveds:[String],
        file: {
            original: {
                id: String,
                name: String,
                size: Number,
                mimeType: String
            },
            thumb: {
                id: String,
                name: String,
                size: Number,
                mimeType: String
            }
        },
        createTime:Date
    });

    this.model = mongoose.model(Settings.options.dbCollectionPrefix + "messages", messageSchema);
    return this.model;

}

MessageModel.prototype.findUnreceivedByUserId = function(startTime,uId,callBack){

    if(Utils.isEmpty(startTime)){
        this.model.find({unreceiveds: uId },function (err,msgs) {
            if(err)
                console.error(err);
            if(callBack)
                callBack(err,msgs);
        });
    }else{

        this.model.find({unreceiveds: uId ,createTime: {$gt: startTime }},function (err,msgs) {
            if(err)
                console.error(err);
            if(callBack)
                callBack(err,msgs);
        });

    }

}



module["exports"] = new MessageModel();