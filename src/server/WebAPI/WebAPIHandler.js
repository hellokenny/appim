var express = require('express');
var router = express.Router();
var Settings = require("../lib/Settings");
var bodyParser = require("body-parser");

var WebAPIHandler ={

    init: function(app,express){

        var self = this;

        app.use(Settings.options.urlPrefix,express.static(__dirname + '/../../../public'));
        app.use(Settings.options.urlPrefix,express.static(__dirname + '/../test'));
        app.use(bodyParser.json());

        /*
        app.use(function(err, req, res, next) {
          console.error(err.stack);
          res.status(500).send('Something broke!');
        });
        */

        // HTTP Routes

        router.use("/user", require('./UserHandler'));
        router.use("/room", require('./RoomHandler'));
        router.use("/message", require('./MessageHandler'));
        // router.use("/temp", require('./TempHandler'));
        // router.use("/message/list", require('./MessageListHandler'));
        // router.use("/message/latest", require('./LatestMessageListHandler').router);
        // router.use("/user/list", require('./UserListHandler'));
        // router.use("/message/sendFile", require('./SendFileAsMessageHandler'));
        // router.use("/file/upload", require('./FileUploadHandler'));
        // router.use("/file/download", require('./FileDownloadHandler'));
        // router.use("/test", require('./TestHandler'));
        // router.use("/stickers", require('./StickerListHandler'));

        WebAPIHandler.router = router;
        app.use(Settings.options.urlPrefix , router);

    }
}

module["exports"] = WebAPIHandler;