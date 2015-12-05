var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Facebook";
var bcrypt = require('bcrypt-nodejs');
function handle_signinrequest(msg, callback){
	var res = {};
	mongo.connect(mongoURL, function(){
	var coll = mongo.collection('login_fb');

	coll.findOne({email: msg.email}, function(err, user){
		if (user)
		{
			if(bcrypt.compareSync(msg.password,user.password)){
				
				res.code = "200";
				res.value = "Succes Login";
				res.session=user.firstname;
				
			}
			else
			{
				res.code = "401";
				res.value = "Failed Login";
			}
		
		callback(null, res);
		}
	});
});	
}

function handle_signuprequest(msg, callback){
		var res = {};		
		mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login_fb');
		coll.insert({firstname:msg.firstname,lastname:msg.lastname,
		email:msg.email,password:bcrypt.hashSync(msg.password, null, null)},function(err,user)
		{
			
			res.code = "200";
			res.value = "Succes Login";
			res.session=msg.firstname;			
			callback(null, res);
		});
	});
}

function handle_fillValues(msg, callback){
	var res = {};
	var overview;
	var work;
	var interests;
	var from_place;
	var lives_in;
	var contact;
	var life;
	
		mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login_fb');
		coll.findOne({firstname:msg.gname},function(err,user)
		{
			overview=user.overview;
			work=user.work;
			interests=user.interests;
			lives_in=user.lives_in;
			from_place=user.from_place;
			contact=user.contact;
			life=user.life;
			res.code = "200";
			res.value = "Succes Login";
			res.overview=overview;
			res.work=work;
			res.interests=interests;
			res.lives_in=lives_in;
			res.from_place=from_place;
			res.contact=contact;
			res.life=life;
			callback(null, res);
		});
	});
}

function handle_addOverview(msg, callback){
	var res = {};
	
		mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login_fb');
		coll.update({firstname:msg.gname},{$set:{"overview":msg.overview}},function(err,user)
		{

			res.code = "200";
			callback(null, res);
		});
	});
}


function handle_addWork(msg, callback){
	var res = {};
	
		mongo.connect(mongoURL, function(){
		var coll = mongo.collection('login_fb');
		coll.update({firstname:msg.gname},{$set:{"work":msg.work}},function(err,user)
		{

			res.code = "200";
			callback(null, res);
		});
	});
}

function handle_addInterests(msg, callback){
	var res = {};
	
		mongo.connect(mongoURL, function(){
		
		var coll = mongo.collection('login_fb');
		coll.update({firstname:msg.gname},{$set:{"interests":msg.interests}},function(err,user)
		{

			res.code = "200";
			callback(null, res);
		});
	});
}

function handle_addLivesIn(msg, callback){
		var res = {};
		mongo.connect(mongoURL, function(){
		var coll = mongo.collection('login_fb');
		coll.update({firstname:msg.gname},{$set:{"lives_in":msg.lives_in}},function(err,user)
		{

			res.code = "200";
			callback(null, res);
		});
	});
}

function handle_addFromPlace(msg, callback){
	var res = {};
	
		mongo.connect(mongoURL, function(){
		var coll = mongo.collection('login_fb');
		coll.update({firstname:msg.gname},{$set:{"from_place":msg.from_place}},function(err,user)
		{

			res.code = "200";
			callback(null, res);
		});
	});
}

function handle_addContact(msg, callback){
	var res = {};
	
		mongo.connect(mongoURL, function(){
		var coll = mongo.collection('login_fb');
		coll.update({firstname:msg.gname},{$set:{"contact":msg.contact}},function(err,user)
		{

			res.code = "200";
			callback(null, res);
		});
	});
}

function handle_addLife(msg, callback){
	var res = {};
	
		mongo.connect(mongoURL, function(){
		var coll = mongo.collection('login_fb');
		coll.update({firstname:msg.gname},{$set:{"life":msg.life}},function(err,user)
		{

			res.code = "200";
			callback(null, res);
		});
	});
}

function handle_fillAboutValues(msg, callback){
	var res = {};
	var overview;
	var work;
	var interests;
	var from_place;
	var lives_in;
	var contact;
	var life;
	console.log("In handle_fillAboutValues request:"+ msg.userName);
		mongo.connect(mongoURL, function(){
		var coll = mongo.collection('login_fb');
		coll.findOne({firstname:msg.userName},function(err,user)
				{
					overview=user.overview;
					work=user.work;
					interests=user.interests;
					lives_in=user.lives_in;
					from_place=user.from_place;
					contact=user.contact;
					life=user.life;
					res.code = "200";
					res.value = "Succes Login";
					res.overview=overview;
					res.work=work;
					res.interests=interests;
					res.lives_in=lives_in;
					res.from_place=from_place;
					res.contact=contact;
					res.life=life;
					callback(null, res);
				});
	});
}
exports.handle_signuprequest = handle_signuprequest;
exports.handle_signinrequest = handle_signinrequest;
exports.handle_fillValues = handle_fillValues;
exports.handle_addOverview = handle_addOverview;
exports.handle_addWork = handle_addWork;
exports.handle_addInterests = handle_addInterests;
exports.handle_addLivesIn = handle_addLivesIn;
exports.handle_addFromPlace = handle_addFromPlace;
exports.handle_addLife = handle_addLife;
exports.handle_addContact = handle_addContact;
exports.handle_fillAboutValues = handle_fillAboutValues;
