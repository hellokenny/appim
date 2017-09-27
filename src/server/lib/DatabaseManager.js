var mongoose = require('mongoose');
var _ = require('lodash');
var Const = require('../const.js');

var DatabaseManager = {

    userModel:null,
    roomModel:null,
    messageModel:null,

    init: function(options){

        var self = this;

        // Connection to our chat database
        console.log("Connecting mongoDB " + options.chatDatabaseUrl);

        try{

            if(!mongoose.connection.readyState){

                mongoose.connect(options.chatDatabaseUrl, function(err){

                    if (err) {

                        console.log("Failed to connect MongoDB!");
                        console.error(err);

                    } else {

                        // Defining a schema
                        self.setupSchema();

                    }
                });

            } else {

                // Defining a schema
                self.setupSchema();

            }


        } catch(ex){

            console.log("Failed to connect MongoDB!");

            throw ex;

        }

    },

    setupSchema : function(){

        this.userModel = require('../Models/UserModel').init();
        this.roomModel = require('../Models/RoomModel').init();
        this.messageModel = require('../Models/MessageModel').init();

    }
}

module["exports"] = DatabaseManager;