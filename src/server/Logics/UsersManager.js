var _ = require('lodash');

var UsersManager = {

    users:{},

    addUser: function(uId,name,avatar,socket){

        var user = {
            userId: uId,
            name: name,
            avatar: avatar,
            socket: socket
        };

        if(_.isUndefined(this.users)){
            this.users = {};
        }

        if(_.isUndefined(this.users[uId])){
            this.users[uId] = {};
        }

        this.users[uId] = user;

        console.log("---------------[UsersManager]addUser-------------")

        console.log(this.users);

    },
    removeUser: function(uId){

        delete this.users[uId];

        console.log(this.users);

    }
}

module["exports"] = UsersManager;