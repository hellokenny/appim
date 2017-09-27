var socket = require('socket.io-client');
var _ = require('lodash');
var CONST = require('../consts');
var Config = require('../init');

(function(global) {
    "use strict;"

    var socketIOManager = {

        io : null,

        init:function(){

            this.io = socket.connect(Config.socketUrl);


            this.io.on('socketerror', function(param){

                if(param.code){
                    console.log('Error:'+CONST.ERROR_CODES[param.code]);

                }else{
                    console.log('Unknown Error');
                }


            });

        },

        emit:function(command,params){

            var command = arguments[0];
            this.io.emit(command, params);

        }

    };

    // Exports ----------------------------------------------
    module["exports"] = socketIOManager;

})((this || 0).self || global);