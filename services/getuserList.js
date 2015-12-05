var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Facebook";

function handle_userList(msg, callback){
	var res = {};
	var ret_list=[];
	
		mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login_fb');
		coll.find({"firstname":{$ne:msg.firstname}},{firstname:1,_id:0}).toArray(function(err,user)
		{
			for(var i=0;i<user.length;i++){
				ret_list[i]=user[i].firstname;
			}
			res.list=ret_list;
			res.code = "200";
			res.value = "Succes Login";
			callback(null, res);
		});
	});
}

exports.handle_userList = handle_userList;