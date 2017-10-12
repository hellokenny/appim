var _ = require('lodash');

var UsersManager = {

    rooms:{},
    addRoom:function (rId,name,ownerId,members,offlines) {

        var room = {
            roomId: rId,
            name: name,
            ownerId: ownerId,
            members: members.slice(0),
            offlines:offlines.slice(0)
        };


        if(_.isUndefined(this.rooms)){
            this.rooms = {};
        }

        if(_.isUndefined(this.rooms[rId])){
            this.rooms[rId] = {};
        }

        this.rooms[rId] = room;

        console.log("---------------addRoom-------------")

        console.log(this.rooms);
    },
    
    removeRoom: function(rId){

        delete this.rooms[rId];

        console.log(this.rooms);

    },

    addUser:function (rId,uId) {
        if(_.isUndefined(this.rooms[rId])){
            this.rooms[rId] = {};
        }
        if(_.isUndefined(this.rooms[rId].members)){
            this.rooms[rId].members = [];
        }
        this.rooms[rId].members.push(uId);

        console.log("---------------addUser-------------");

        console.log(this.rooms);
    },

    removeUser:function (rId,uId) {
        _.pull(this.rooms[rId].members,uId.toString());
        _.pull(this.rooms[rId].offlines,uId.toString());

        console.log(this.rooms);
    },

    enterRoom: function(rId,uId){

        _.pull(this.rooms[rId].offlines,uId.toString());

        console.log("---------------enterRoom-------------");

        console.log(this.rooms);

    },

    leaveRoom: function(rId,uId){

        if(_.isUndefined(this.rooms[rId])){
            this.rooms[rId] = {};
        }
        if(_.isUndefined(this.rooms[rId].offlines)){
            this.rooms[rId].offlines = [];
        }
        this.rooms[rId].offlines.push(uId);


        console.log("---------------leaveRoom-------------");

        console.log(this.rooms);

    }

}

module["exports"] = UsersManager;