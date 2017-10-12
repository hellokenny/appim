var mongoose = require('mongoose');
var Settings = require("../lib/Settings");

var RoomModel = function(){

};

RoomModel.prototype.model = null;

RoomModel.prototype.init = function(){

    // Defining a schema
    var roomSchema = new mongoose.Schema({
        name: String,
        members:[String],
        ownerId: String,
        createTime: Date
    });

    this.model = mongoose.model(Settings.options.dbCollectionPrefix + "rooms", roomSchema);
    return this.model;

}

RoomModel.prototype.findByUserId = function(uId,callBack){

    this.model.find({ members: uId },function (err, rooms) {
        // this.model.find({ members: "ObjectId(\"" + uId + "\")" },function (err, rooms) {

        if (err)
            console.error(err);

        if(callBack)
            callBack(err,rooms);

    });

}

module["exports"] = new RoomModel();