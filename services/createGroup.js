var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Facebook";
var bcrypt = require('bcrypt-nodejs');

function handle_createGroup(msg, callback){
	var res = {};
	var list=[];
	list.push(msg.gmem);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('groups');

	coll.insert({groupName: msg.gname,gMembers:list,admin:msg.admin}, function(err, user){
		res.code = 200;		
		callback(null, res);
	});
});	
}


function handle_deleteGroup(msg, callback){
	var res = {};
	
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('groups');

	coll.remove({groupName: msg.gname,admin:msg.admin}, function(err, user){
		res.code = 200;		
		callback(null, res);
	});
});	
}


function handle_getGroups(msg, callback){
	var res = {};
	mongo.connect(mongoURL, function(){
	var coll = mongo.collection('groups');
	var templist=[];
	coll.find({$or:[{admin: msg.searchName},{gMembers:msg.searchName}]}).toArray(function(err, user){
		res.code = 200;

		for(var i=0;i<user.length;i++){
			templist[i]=user[i].groupName;
		}
		res.groupList=templist;			
		callback(null, res);
	});
});
}


function handle_addToGroup(msg, callback){
	var res = {};
	mongo.connect(mongoURL, function(){
	var coll = mongo.collection('groups');
	coll.update({$and:[{groupName: msg.gname},{admin:msg.admin}]},{$addToSet:{gMembers:msg.gmem}}, function(err,user){
		res.code=200;
		callback(null,res);
	});	
});	
}

function handle_deleteFromGroup(msg, callback){
	var res = {};
	mongo.connect(mongoURL, function(){
	var coll = mongo.collection('groups');

	coll.update({$and:[{groupName: msg.gname},{admin:msg.admin}]},{$pull:{gMembers:msg.gmem}},function(err, user){
		res.code = 200;
		res.gname=msg.gname;			
		callback(null, res);
	});
});	
}


function handle_getMembers(msg, callback){
	var res = {};
	var list=[];
	mongo.connect(mongoURL, function(){
	var coll = mongo.collection('groups');

	coll.find({groupName: msg.gname},{_id:0,gMembers:1}).toArray(function(err, user){
		res.code = 200;
		for(var i=0;i<user.length;i++){
		list[i]=user[i].gMembers;	
		}
		res.members=list;			
		callback(null, res);
	});
});	
}


exports.handle_createGroup = handle_createGroup;
exports.handle_deleteGroup = handle_deleteGroup;
exports.handle_getGroups = handle_getGroups;
exports.handle_addToGroup = handle_addToGroup;
exports.handle_deleteFromGroup = handle_deleteFromGroup;
exports.handle_getMembers = handle_getMembers;