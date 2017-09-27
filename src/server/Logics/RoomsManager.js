var _ = require('lodash');

var UsersManager = {

    rooms:{},
    addRoom:function (rid,name,ownId,members,offlines) {

        var room = {
            roomId: rid,
            name: name,
            ownId: ownId,
            members: members.slice(0),
            offlines:offlines.slice(0)
        };


        if(_.isUndefined(this.rooms)){
            this.rooms = {};
        }

        if(_.isUndefined(this.rooms[rid])){
            this.rooms[rid] = {};
        }

        this.rooms[rid] = room;
    },
    
    removeRoom: function(rid){

        delete this.rooms[rid];

    },

    addUser:function (rid,uid) {
        if(_.isUndefined(this.rooms[rid])){
            this.rooms[rid] = {};
        }
        if(_.isUndefined(this.rooms[rid].members)){
            this.rooms[rid].members = [];
        }
        this.rooms[rid].members.push(uid);
    },

    removeUser:function (rid,uid) {
        _.pull(this.rooms[rid].members,uid);
        _.pull(this.rooms[rid].offlines,uid);
    },

    enterRoom: function(rid,uid){

        _.pull(this.rooms[rid].offlines,uid);

    },

    leaveRoom: function(rid,uid){

        if(_.isUndefined(this.rooms[rid])){
            this.rooms[rid] = {};
        }
        if(_.isUndefined(this.rooms[rid].offlines)){
            this.rooms[rid].offlines = [];
        }
        this.rooms[rid].offlines.push(uid);

    }

}

module["exports"] = UsersManager;