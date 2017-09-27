var init = require('./init.js');
var express = require('express');
var _ = require('lodash');

var Settings = require('./lib/Settings');

var appim = function(app,io,options){

    Settings.options = _.merge(init,options.config);
    Settings.listeners = options.listeners;

    var WebAPIHandlerV1 = require('./WebAPI/WebAPIHandler');
    WebAPIHandlerV1.init(app,express);

    var SocketAPIHandler = require('./SocketAPI/SocketAPIHandler');
    SocketAPIHandler.init(io);

    var DatabaseManager = require('./lib/DatabaseManager');
    DatabaseManager.init(Settings.options);

    // var BridgeManager = require('./lib/BridgeManager');
    // BridgeManager.init();

    // define custome funcitons
    this.getOnlineUsersByRoomId = function(roomId){
        var UsersManager = require('./Logics/UsersManager');
        return UsersManager.getUsers(roomId);
    };

}

appim.prototype.options = {};

module.exports = appim;