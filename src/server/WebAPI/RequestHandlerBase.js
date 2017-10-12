var path = require('path');

var Const = require("../const");
var Settings = require("../lib/Settings");

var RequestHandlerBase = function(){

}

RequestHandlerBase.prototype.path = function(path){

    return Settings.options.urlPrefix + path;

}

RequestHandlerBase.prototype.errorResponse = function(
    response,
    httpCode){

    response.status(httpCode);
    response.send("");

}

RequestHandlerBase.prototype.successResponse = function(response,code,data){

    response.status(Const.httpCodeSucceed);

    if(code != Const.resCodeSucceed){

        response.json({
            code : code
        });

    } else {

        response.json({
            code : Const.resCodeSucceed,
            data : data
        });

    }


}

module["exports"] = RequestHandlerBase;