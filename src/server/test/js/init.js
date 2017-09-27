(function(global) {

    "use strict;"

    var Config = {};

    Config.apiBaseUrl = "http://10.101.132.67:8080/appim";
    Config.socketUrl = "http://10.101.132.67:8080/appim";

    Config.googleMapAPIKey = "";

    Config.defaultContainer = "#spika-container";
    Config.lang = "en";
    Config.showSidebar = true;
    Config.showTitlebar = true;
    Config.useBothSide = false;
    Config.thumbnailHeight = 256;

    // Exports ----------------------------------------------
    module["exports"] = Config;

})((this || 0).self || global);
