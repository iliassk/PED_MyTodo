var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var expressValidator = require('express-validator');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

var auth = require('./models/auth.js')
var utils = require('./models/utils.js')
var todo = require('./models/todo.js')

var app = module.exports = express();

/*MySql connection*/
var connection = mysql.createPool({
	host: "localhost",
	port: "8889",
	user: "todomanager",
	password: "todomanager",
	database: "todoManager_db"
});


app.use(bodyParser.json());
app.use(expressValidator());

// To enable CORS
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	next();
})

app.post('/register', function(req, res, next) {
 	auth.register_post(req, res, next, connection, jwt, bcrypt)
})

app.post('/login', function(req, res, next) {
	auth.login_post(req, res, next, connection, jwt, bcrypt)
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