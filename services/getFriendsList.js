var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Facebook";



function handle_getFriendsList(msg, callback){
	
	var res = {};
	var j;
	mongo.connect(mongoURL, function(){
	var coll = mongo.collection('Friends');
	coll.find({$or:[{$and:[{send_value:"4"},{recv_value:"4"},{sender:msg.searchName}]},{$and:[{send_value:"4"},{recv_value:"4"},{receiver:msg.searchName}]}]},{send_value:0,recv_value:0,_id:0}).toArray(function(err,user)
	{
		if (user)
		{
			
			var friends_name=[];
			res.code = "200";
			for(var i=0;i<user.length;i++)
			{
				if(user[i].sender==msg.searchName)
				{
					
					friends_name[i]=user[i].receiver;
				}
				if(user[i].receiver==msg.searchName)
				{
					
					friends_name[i]=user[i].sender;
				}					
				
			}
			res.friends_name=friends_name;
		} 
		else
		{
			res.code = "401";
			res.value = "Failed search";
		}
		callback(null, res);
	});
});	
}



exports.handle_getFriendsList = handle_getFriendsList;