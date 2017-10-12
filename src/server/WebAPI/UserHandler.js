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

    /**
     * @api {post} /user/login Get api token
     * @apiName Login
     * @apiGroup WebAPI
     * @apiDescription Login to the room specified in request, and get token for the room.

     * @apiParam {name} Users Name
     * @apiParam {avatarURL} URL of avatar image
     * @apiParam {roomID} Room Name to login
     * @apiParam {userID} User's Unique ID
     *
     * @apiSuccess {String} Token
     * @apiSuccess {String} User Model of loginned user
     *
     * @apiSuccessExample Success-Response:

     {
         code: 1,
         data: {
             token: 'FPzdinKSETyXrx0zoxZVYoVt',
             user: {
                 _id: '564b128a94b8f880877eb47f',
                 userID: 'test',
                 name: 'test',
                 avatarURL: 'test',
                 token: 'zJd0rlkS6OWk4mBUDTL5Eg5U',
                 created: 1447760522576,
                 __v: 0
             }
         }
     }

     */
    router.post('/login',function(request,response){

        UserLogic.login(request.body,function(result){

            self.successResponse(response,Const.responsecodeSucceed,{
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
