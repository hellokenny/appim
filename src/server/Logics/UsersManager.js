var _ = require('lodash');

var UsersManager = {

    users:{},

    addUser: function(uid,name,avatar,socket){

        var user = {
            userId: uid,
            name: name,
            avatar: avatar,
            socket: socket
        };

        if(_.isUndefined(this.users)){
            this.users = {};
        }

        if(_.isUndefined(this.users[uid])){
            this.users[uid] = {};
        }

        this.users[uid] = user;

    },
    removeUser: function(uid){

        delete this.users[uid];

    }
}

module["exports"] = UsersManager;