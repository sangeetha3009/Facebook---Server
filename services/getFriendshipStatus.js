var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Facebook";

function handle_isFriend(msg, callback){
	var res = {};
		mongo.connect(mongoURL, function(){
		var coll = mongo.collection('Friends');
		coll.find({$or:[{sender:msg.myName} ,{receiver:msg.myName}]},{_id:0}).toArray(function(err,user)
		{
			if(user.length==0){
			res.code=200;
			res.query_value=1;
			callback(null, res);
			}
			else{
				coll.find({$and:[{sender:msg.myName},{receiver:msg.searchName},{send_value:{$ne:"4"}},{recv_value:{$ne:"4"}}]}
				,{sender:1,_id:0}).toArray(function(err,user){
					if(user.length!=0){
						res.code=200;
						res.query_value=2;
						callback(null, res);						
					}
					else{
					coll.find({$and:[{sender:msg.searchName},{receiver:msg.myName}]},{_id:0}).toArray(function(err,user){
					if(user.length!=0){
						if(user[0].send_value==4 && user[0].recv_value==4){
							res.code=200;
							res.query_value=4;
							callback(null, res);
							
						}
						else{
							
							res.code=200;
							res.query_value=3;
							callback(null, res);
						}
						
					}
					else{
						coll.find({$and:[{sender:msg.myName},{receiver:msg.searchName}]},{_id:0}).toArray(function(err,user){
							if(user.length!=0){
								if(user[0].send_value==4 && user[0].recv_value==4){
									res.code=200;
									res.query_value=4;
									callback(null, res);
									
								}
								
							}
							else{
								res.code=200;
								res.query_value=1;
								callback(null, res);
								
							}
							
						});
						
						
					}
						
					});
					}
					
				});
			}
		});
	});
}

function handle_addFriend(msg, callback){
	
	var res = {};
	mongo.connect(mongoURL, function(){
	var coll = mongo.collection('Friends');
	coll.insert({sender:msg.myName, receiver:msg.searchName,send_value:"2",recv_value:"3"},function(err,user)
	{
		res.code=200;
		res.query_value=2;
		callback(null, res);	
	
	});
	});
}



function handle_acceptFriend(msg, callback){
	
	var res = {};
	mongo.connect(mongoURL, function(){
	var coll = mongo.collection('Friends');
	coll.update({$and:[{sender:msg.searchName},{receiver:msg.myName}]},{$set:{send_value:"4",recv_value:"4"}},function(err,user)
	{
		res.code=200;
		res.query_value=4;
		callback(null, res);	
	
	});
	});
}



exports.handle_isFriend = handle_isFriend;
exports.handle_addFriend = handle_addFriend;
exports.handle_acceptFriend = handle_acceptFriend;