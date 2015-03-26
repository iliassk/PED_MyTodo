'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var mysql = require('mysql');
var jwt = require('jwt-simple');
var passport = require('passport');
var request = require('request');
var cors = require('cors');

var auth = require('./models/auth.js');
var utils = require('./models/utils.js');
var todo = require('./models/todo.js');
var LocalStrategy = require('./services/localStrategy.js');
var emailVerification = require('./services/emailVerification.js');
var multer  = require('multer');
var contact = require('./models/contact.js')

var app = module.exports = express();
var os = require('os')
var done=false;


var connection;
if(os.type() == 'Darwin'){
	connection = mysql.createPool({
		host: "localhost",
		port: 8889,
		user: "todomanager",
		password: "todomanager",
		database: "todoManager_db"
	});
}
else{
	connection = mysql.createPool({
		host: "localhost",
		user: "todomanager",
		password: "todomanager",
		database: "todoManager_db"
	});
}

/*Configure the multer.*/

app.use(multer({ dest: '../frontend/app/upload/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));

app.use(bodyParser.json());
app.use(expressValidator());

passport.serializeUser(function(user, done) {
	done(null, user.id_user);
});
passport.deserializeUser(function(user, done) {
	done(null, user.id_user);
});
app.use(passport.initialize());

// To enable CORS (works with satellizer)
var whitelist = ['http://localhost:9000', 'http://localhost:9001'];
app.use(cors({
	origin: function(origin, callback) {
		var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
		callback(null, originIsWhitelisted);
	},
	credentials: true,
	methods: ['GET', 'PUT', 'POST', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

passport.use('local-register', LocalStrategy.register);
passport.use('local-login', LocalStrategy.login);

app.post('/register', passport.authenticate('local-register'), function(req, res) {
	emailVerification.sendEmail(req.user.email, res);
	auth.createSendToken(req.user, connection, req, res, jwt);
});

app.get('/auth/verifyEmail', function(req, res) {
	emailVerification.handler(req, res, connection)
});

app.post('/login', passport.authenticate('local-login'), function(req, res) {
	auth.createSendToken(req.user, connection, req, res, jwt);
});

app.post('/auth/google', function(req, res, next) {
	auth.authGoogle(req, res, next, connection, jwt, request);
});

app.post('/auth/facebook', function(req, res, next) {
	auth.authFacebook(req, res, next, connection, jwt, request);
});

app.get('/auth/twitter', function(req, res, next) {
	auth.authTwitter(req, res, next, connection, jwt, request);
});

app.post('/todolist', function(req, res, next) {
	todo.todolist_post(req, res, next, connection, auth, jwt)
});

app.get('/listtodolist/:id', function(req, res, next) {
	todo.listtodolist_id_get(req, res, next, connection, auth);
});

app.get('/todolist/:id', function(req, res, next) {
	todo.todolist_get(req, res, next, connection, auth, jwt)
});

app.get('/listtodolist', function(req, res, next) {
	todo.listtodolist_get(req, res, next, connection, auth, jwt)
});

app.get('/listtodolistwithtodos', function(req, res, next) {
	todo.listtodolistwithtodos_get(req, res, next, connection, auth, jwt)
});

app.get('/listsharedtodolistwithtodos', function(req, res, next) {
	todo.listsharedtodolistwithtodos_get(req, res, next, connection, auth, jwt)
});

app.get('/listgroupe', function(req, res, next) {
	contact.listgroupe_get(req, res, next, connection, auth, jwt)
});

app.post('/addgroup', function(req, res, next) {
	contact.addgroup_post(req, res, next, connection, auth, jwt)
});

app.get('/userslist', function(req, res, next) {
	contact.userslist_get(req, res, next, connection, auth)
});

app.get('/user/:id', function(req, res, next) {
	contact.userid_get(req, res, next, connection, auth)
});

app.post('/addcontact', function(req, res, next) {
console.log('debut user')	
	contact.addcontact_post(req, res, jwt, next, connection, auth)		
console.log('fin user')	
});

app.delete('/deletecontact/:id', function(req, res, next) {	
	contact.deletecontact_delete(req, res, jwt, next, connection, auth)	
});

app.get('/listuserNocontact/:id', function(req, res, next) {	
	console.log('debut')
	contact.listuserNocontact_id_get(req, res, jwt, next, connection, auth)
	console.log('fin')
});

app.delete('/listtodolist/:id', function(req, res, next) {
	todo.listtodolist_id_delete(req, res, next, connection, auth)
});

app.delete('/todo/:id', function(req, res, next) {
	todo.todo_id_delete(req, res, next, connection, auth)
});

app.delete('/subtodo/:id', function(req, res, next) {
	todo.subtodo_id_delete(req, res, next, connection, auth)
});

app.put('/todo/:id', function(req, res, next) {
	todo.todo_id_put(req, res, next, connection, auth)
});

app.put('/todos', function(req, res, next) {
	console.log('debut todos')
	todo.todos_put(req, res, next, connection, auth)
	console.log('fin todos')
});


app.get('/todo', function(req, res, next) {
	todo.todo_get(req, res, next, connection, auth, jwt)
});


app.post('/add/todo', function(req, res, next) {
	todo.todoadd_post(req, res, next, connection, auth, jwt)
});


app.get('/todo/:id', function(req, res, next) {
    todo.todo_id_get(req, res, next, connection, auth, jwt)
})

/**
 * Génere le lien url pour le TODO partagé avec un étranger, l'ajoute à la BD et le renvoie au client
 * Le lien est généré à partir de l'id et d'une clé : todo pour un todo et todolist pour une liste (ici todo)
 */
app.get('/share/todo/:id', function(req, res, next) {
    todo.sharetodo_id_get(req, res, next, connection, auth, utils, jwt)
})

/**
 * Génere le lien url pour le TODO partagé avec un étranger, l'ajoute à la BD et le renvoie au client
 * Le lien est généré à partir de l'id et d'une clé : todo pour un todo et todolist pour une liste (ici todolist)
 */
app.get('/share/todolist/:id', function(req, res, next) {
   	todo.sharetodolist_id_get(req, res, next, connection, auth, utils, jwt)
})

/**
 * Renvoi les données correspondant à la donnée partagée
 */
app.get('/share/data/:url/:type', function(req, res, next) {
   	todo.getSharedData(req, res, next, connection, utils)
})

/**
 * Partage un todo avec un autre utilisateur
 */
app.post('/share/todo/:id_todo/:id_user', function(req, res, next) {
   	todo.shareTodoContact(req, res, next, connection, utils)
})

/**
 * Partage une liste avec un autre utilisateur
 */
app.post('/share/todolist/:id_todolist/:id_user', function(req, res, next) {
   	todo.shareListContact(req, res, next, connection, utils)
})

/**
* Permet l'upload de fichier
*/
app.post('/upload',function(req,res){
  if(done==true){
    console.log(req.files);
    res.status(200).json(req.files);
    res.end("File uploaded.");
  }
})

app.post('/avatarpath', function(req, res, next) {
	console.log('debut')
    todo.avatarpath_post(req, res, next, connection, auth, utils, jwt)
    console.log('fin')
})

/**
* Permet de récuperer un fichier
*/
app.get('/upload/:id', function(req, res, next) {
});

// to check connection status of the server from the client
app.get('/connected', function(req, res, next) {
	res.send({
		status : true
	});
});

var server = app.listen(3000, function() {
	console.log('api listening on port', server.address().port);
});

module.exports = app;