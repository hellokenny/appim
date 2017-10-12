var _ = require('lodash');
var RequestHandlerBase = require("./RequestHandlerBase");
var MessageLogic = require("../Logics/MessageLogic");
var express = require('express');
var router = express.Router();
var Const = require("../const");


var MessageHandler = function(){

}

_.extend(MessageHandler.prototype,RequestHandlerBase.prototype);

MessageHandler.prototype.attach = function(router){

    var self = this;

    // {post} /message/send
    router.post('/send',function(request,response){

        MessageLogic.send(request.body,function(result){

            self.successResponse(response,Const.resCodeSucceed,null);

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

new MessageHandler().attach(router);
module["exports"] = router;
