(function(global) {
    "use strict;"

    // Class ------------------------------------------------
    var Config = {};

    Config.host = "10.101.132.67";
    Config.port = 8989;

    Config.chatDatabaseUrl = "mongodb://localhost/appim";
    Config.dbCollectionPrefix = "appim";

    Config.urlPrefix = '/appim';
    Config.noAvatarImg = "http://" + Config.host + ":" + Config.port + Config.urlPrefix + "/img/noavatar.png";

    Config.socketNameSpace = '/appim';

    //
    // Config.imageDownloadURL = "http://" + Config.host + "/:" + Config.port + Config.urlPrefix + "/media/images/";
    //
    //
    // Config.uploadDir = 'public/uploads/';
    // Config.sendAttendanceMessage = true;
    //
    // Config.stickerBaseURL = 'http://appim.chat';
    // Config.stickerAPI = Config.stickerBaseURL + '/api/v2/stickers/56e005b1695213295419f5df';

    // Exports ----------------------------------------------
    module["exports"] = Config;

})((this || 0).self || global);
