var _ = require('lodash');
var RequestHandlerBase = require("./RequestHandlerBase");
var RoomLogic = require("../Logics/RoomLogic");
var RoomManager = require('../Logics/RoomsManager');
var express = require('express');
var router = express.Router();
var Const = require("../const");
var moment = require('moment');


var RoomHandler = function(){

}

_.extend(RoomHandler.prototype,RequestHandlerBase.prototype);

RoomHandler.prototype.attach = function(router){

    var self = this;

    router.post('/add/',function(request,response){

        RoomLogic.add(request.body,function(result){
            var room =result.room;

            self.successResponse(response,Const.resCodeSucceed,{
                rId:room._id,
            });

        },function(err,code){

            if(err){

                self.errorResponse(
                    response,
                    Const.httpCodeSeverError
                );

            }else{

                self.successResponse(response,code);

            }

        });

    });

}

new RoomHandler().attach(router);
module["exports"] = router;
