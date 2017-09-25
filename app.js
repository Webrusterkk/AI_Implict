var express = require('express')
	,routes = require('./routes')	
	,AuthHandler = require('./handlers/AuthHandler')
	,passport = require('passport');
	const mysql = require('mysql');

	
var app =module.exports.ai_auth= express();

var google_strategy = require('passport-google-oauth').OAuth2Strategy;

app.configure(function() {

	app.set('client-url','https://us-central1-ainewmek.cloudfunctions.net/');
	app.set('client-google-signin','/google?action=signin');
	app.disable('x-powered-by');

	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(passport.initialize());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    if ('OPTIONS' == req.method) {
    	res.send(200);
    }
    else {
    	next();
    }
}; 

app.configure('development', function() {
	app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
	console.log("Starting in development mode");
});




passport.use(new google_strategy({
    clientID: '871541366945-ahokgv541utp2u46disq09jeggdv7c1m.apps.googleusercontent.com',
    clientSecret: 'u4RCubfQJH4YwbhOWl9fnxd-',
	callbackURL: 'https://oauth-redirect.googleusercontent.com/r/ai-storeagent'
	
  //  callbackURL:'http://localhost:8010/ai_newmek/us-central1/aiauth/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
	  console.log(accessToken);
	 // console.log(profile);
	  //INSERT INTO `talk`.`Demo_auth` (`AcessToken`, `Profile Name`, `Email`) VALUES ('1wee', 'erer', 'rere@gma');
	//   try {
		
	// 			var connection = mysql.createConnection({
	// 				host: "183.82.98.147",
	// 				user: "talk",
	// 				password: "talk@123",
	// 				database: "talk"
	// 			});
	// 	let myquery = 'INSERT INTO Demo_auth (AcessToken, Profile_Name, Email) VALUES ("'+ 
	// 	    accessToken+'", "'+ profile.displayName +'", "'+ profile._json.email+ '")'
	//      //  console.log(myquery);
	// 			connection.query(myquery, function (error, results, fields) {
	// 				if (!error) {
	// 					console.log(results);

	// 				} else {
	// 					console.log(error);
	// 				}
	// 			});
	// 			connection.end();
		
	// 		} catch (err) {
    //          	console.log(err);
	// 		}

  }
));


var handlers = {

	auth: new AuthHandler()
};

routes.setup(app,handlers);


//app.listen(3000);
console.log('started sucessfully');


