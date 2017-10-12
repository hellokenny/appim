var _ = require('lodash');
var UsersManager = require("./Logics/UsersManager");
var RoomsManager = require("./Logics/RoomsManager");
var moment = require('moment');

var MessageModel = require("./Models/MessageModel");
var Settings = require('./lib/Settings');
var DatabaseManager = require('./lib/DatabaseManager');
DatabaseManager.init(Settings.options);

var objectid = require('objectid');

var id =objectid();

var idstr = id.toString();

var idstr1 = idstr.toString();

var t = '111';

var tt = t.toString();

// console.log(objectid());
// console.log(objectid());
// console.log(objectid());


// var st1 = '2017-09-27 10:08:28';
//
// var std = '2017-09-27 10:08:28';
//
// var dt1 = new Date('2017-09-27 10:08:28') ;
//
// var dtutc = moment(dt1).utc();
//
// var dtutcformat = moment(dt1).utc().format();
//
// var uId='59c0c092eab58e61f8730d6e';

// var ps ={}
//
// var pid=11;
//
// if(_.isUndefined(ps[pid])){
//     ps[pid] = {};
// }
//
// var p = {
//     ac:1,
//     name:"aa"
// }
//
// ps[pid] = p;






// var members1 = ["59c0bb3189b1c15c9aa9cfba","59c0bcc4eab58e61f8730d6d","59c0bcc4eab58e61f8730d6c"];
// var members1new = _.remove(members1,"59c0bcc4eab58e61f8730d6c");
//
// var members2 = ["59c0bb3189b1c15c9aa9cfba","59c0bcc4eab58e61f8730d6c","59c0bcc4eab58e61f8730d6c"];
// var members2new = _.pull(members2,"59c0bcc4eab58e61f8730d6c");
//
// var members = ["59c0bb3189b1c15c9aa9cfba","59c0bcc4eab58e61f8730d6d","59c0bcc4eab58e61f8730d6c"];
// var membersnew = _.pullAll(members,"59c0bcc4eab58e61f8730d6c");



// var arr=["59c0bb3189b1c15c9aa9cfba","59c0bcc4eab58e61f8730d6d","59c0bcc4eab58e61f8730d6d"];
//
// var a="59c0bcc4eab58e61f8730d6d";
//
// var t1 = _.findIndex(arr,a);
//
// var t12 = _.findIndex(arr,function (item) {
//     return item == a;
// })
//
// var t13 = _.indexOf(arr,a);
//
//
//
// var ar=[1,2,2];
//
// var r=2;
//
// var tr1 = _.findIndex(ar,r);
//
// var tr12 = _.findIndex(ar,function (item) {
//     return item = r;
// })
//
// var tr13 = _.indexOf(ar,r);
//
//
// var users = [
//     { 'user': 'barney',  'active': false },
//     { 'user': 'fred',    'active': false },
//     { 'user': 'pebbles', 'active': true }
// ];
//
// var u0 = _.findIndex(users, function(chr) {
//     return chr.user == 'barney';
// });
// // => 0
//
// // using the `_.matches` callback shorthand
// var u1 = _.findIndex(users, { 'user': 'fred', 'active': false });
// // => 1
//
// // using the `_.matchesProperty` callback shorthand
// var u2 = _.findIndex(users, 'active', false);
// // => 0
//
// // using the `_.property` callback shorthand
// var u3 = _.findIndex(users, 'active');
// // => 2

// var users = [
//     { 'user': 'barney',  'active': false },
//     { 'user': 'fred',    'active': false },
//     { 'user': 'pebbles', 'active': true },
//     { 'user': 'kenny', 'active': false }
// ];

// var t0 = _.findIndex(users, function(o) { return o.user == 'barney'; });
// // => 0
//
// // The `_.matchesProperty` iteratee shorthand.
// var t2 = _.findIndex(users, ['active', false]);
// // => 0
//
// // The `_.property` iteratee shorthand.
// var t3 = _.findIndex(users, 'active');
// // => 2
//
// // The `_.property` iteratee shorthand.
// var t4 = _.findIndex(users, ['user', 'kenny']);
// // => 2

// // The `_.matches` iteratee shorthand.
// var t1 = _.findIndex(users, { 'user': 'fred', 'active': false });
// // => 1
//
// var t5 = _.indexOf(users,{ 'user': 'fred', 'active': false });
//
// var arr=["59c0bb3189b1c15c9aa9cfba","59c0bcc4eab58e61f8730d6d","59c0bcc4eab58e61f8730d6d"];
// var a="59c0bcc4eab58e61f8730d6d";
//
// var t11 = _.findIndex(arr, a);
//
// var t13 = _.indexOf(arr,a);




module["exports"] = UsersManager;