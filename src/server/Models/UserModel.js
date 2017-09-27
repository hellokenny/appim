var mongoose = require('mongoose');
var Settings = require("../lib/Settings");

var UserModel = function(){

};

UserModel.prototype.model = null;

UserModel.prototype.init = function(){

    // Defining a schema
    var userSchema = new mongoose.Schema({
        ac:String,
        name: String,
        avatar: String,
        createTime: Date
    });

    this.model = mongoose.model(Settings.options.dbCollectionPrefix + "users", userSchema);
    return this.model;

}

UserModel.prototype.findByAc = function(ac,callBack){

    this.model.findOne({ ac: new RegExp("^" + ac + "$","g") },function (err, user) {

        if (err)
            console.error(err);

        if(callBack)
            callBack(err,user);

    });

}


module["exports"] = new UserModel();