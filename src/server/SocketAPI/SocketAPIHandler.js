var Settings = require("../lib/Settings");

var SocketAPIHandler = {

    io:null,
    nsp : null,
    init: function(io){

        var self = this;
        this.io = io;
        this.nsp = io.of(Settings.options.socketNameSpace);

        this.nsp.on('connection', function(socket) {

            // require('./DisconnectActionHandler').attach(io,socket);
            require('./UserActionHandler').attach(io,socket);
            require('./MessageActionHandler').attach(io,socket);
            require('./RoomActionHandler').attach(io,socket);
            // require('./SendTypingActionHandler').attach(io,socket);
            // require('./OpenMessageActionHandler').attach(io,socket);
            // require('./DeleteMessageActionHandler').attach(io,socket);

        });

    }

};

module["exports"] = SocketAPIHandler;