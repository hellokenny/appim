var mongoose = require('mongoose');
var Settings = require("../lib/Settings");

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

MessageModel.prototype.findUnreceivedByUerId = function(startTime,uid,callBack){

    if(startTime != null){
        this.model.find({unreceiveds: uid ,createTime: {$gt:"ISODate(\"" + startTime + "\")"}},function (err,msgs) {
            if(err)
                console.error(err);
            if(callBack)
                callBack(err,msgs);
        });
    }else{

        this.model.find({unreceiveds: uid },function (err,msgs) {
            if(err)
                console.error(err);
            if(callBack)
                callBack(err,msgs);
        });
    }

}


module["exports"] = new MessageModel();