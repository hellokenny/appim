var _ = require('lodash');
var RequestHandlerBase = require("./RequestHandlerBase");
var UserLogic = require("../Logics/UserLogic");
var express = require('express');
var router = express.Router();
var Const = require("../const");


var UserHandler = function(){

}

_.extend(UserHandler.prototype,RequestHandlerBase.prototype);

UserHandler.prototype.attach = function(router){

    var self = this;

    // {post} /user/login
    router.post('/login',function(request,response){

        UserLogic.login(request.body,function(result){

            self.successResponse(response,Const.resCodeSucceed,{
                user: result.user,
                msgs: result.msgs
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

new UserHandler().attach(router);
module["exports"] = router;
