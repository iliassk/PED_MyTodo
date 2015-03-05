var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var mysql = require('mysql');
var jwt = require('jwt-simple');
var passport = require('passport');

var auth = require('./models/auth.js');
var utils = require('./models/utils.js');
var todo = require('./models/todo.js');
var LocalStrategy = require('./services/localStrategy.js');

var app = module.exports = express();

/*MySql connection*/
var connection = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "",
	database: "todoManager_db"
});


app.use(bodyParser.json());
app.use(expressValidator());

passport.serializeUser(function(user, done) {
	done(null, user.id_user);
})
app.use(passport.initialize());

// To enable CORS
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	next();
})

passport.use('local-register', LocalStrategy.register);
passport.use('local-login', LocalStrategy.login);

app.post('/register', passport.authenticate('local-register'), function(req, res) {

	//validation
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();

	req.checkBody('email', 'A valid email is required').isEmail();
	req.checkBody('password', 'Enter a password 1 - 20').len(1, 20);

	var errors = req.validationErrors();
	if (errors) {
		res.status(422).json(errors);
		return;
	}

	auth.createSendToken(req.user, req, res);
});

app.post('/login', passport.authenticate('local-login'), function(req, res) {

	//validation
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		res.status(422).json(errors);
		return;
	}
	
	auth.createSendToken(req.user, req, res);
});


app.post('/todolist', function(req, res, next) {
	todo.todolist_post(req, res, next, connection, auth)
})

app.get('/listtodolist/:id', function(req, res) {
	todo.listtodolist_id_get(req, res, next, connection, auth)
})

app.get('/listtodolist', function(req, res, next) {
	console.log("toto")
	todo.listtodolist_get(req, res, next, connection, auth)
	console.log("toto fin")
});

app.delete('/listtodolist/:id', function(req, res) {
	todo.listtodolist_id_delete(req, res, next, connection, auth)
});

app.delete('/todo/:id', function(req, res) {
	todo.todo_id_delete(req, res, next, connection, auth)
});

app.put('/todo/:id', function(req, res) {
	todo.todo_id_put(req, res, next, connection, auth)
});


app.post('/add/todo', function(req, res, next) {
	todo.todoadd_post(req, res, next, connection, auth)
});

app.get('/todo/:id', function(req, res, next) {
    todo.todo_id_get(req, res, next, connection, auth)
})

/**
* Génere le lien url pour le TODO partagé avec un étranger, l'ajoute à la BD et le renvoie au client
* Le lien est généré à partir de l'id et d'une clé : todo pour un todo et todolist pour une liste (ici todo)
*/
app.get('/share/todo/:id', function(req, res, next) {
    todo.sharetodo_id_get(req, res, next, connection, auth, utils)
})

/**
* Génere le lien url pour le TODO partagé avec un étranger, l'ajoute à la BD et le renvoie au client
* Le lien est généré à partir de l'id et d'une clé : todo pour un todo et todolist pour une liste (ici todolist)
*/
app.get('/share/todolist/:id', function(req, res, next) {
   	todo.sharetodolist_id_get(req, res, next, connection, auth, utils)
})

var server = app.listen(3000, function() {
	console.log('api listening on port', server.address().port);
})

module.exports = app;