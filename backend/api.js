var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var expressValidator = require('express-validator');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

var algos = require('./models/algos.js')
var auth = require('./models/auth.js')
var share = require('./models/share.js')

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
 
    //validation
    req.assert('username', 'Username is required').notEmpty();
    req.assert('email', 'Email is required').notEmpty();
    req.assert('password', 'Password is required').notEmpty();

    req.assert('email', 'A valid email is required').isEmail();
    req.assert('password', 'Enter a password 1 - 20').len(1, 20);

    var errors = req.validationErrors();
    if (errors) {
        res.status(422).json(errors);
        return;
    }

    //get data from the request
    var data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    //Hash passwords
    bcrypt.genSalt(10, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(data.password, salt, null, function(err, hash) {
			// Store hash in your password DB.
			if (err) return next(err);

			data.password = hash;

			//insertion 
			connection.query('INSERT INTO USERS SET ?', data, function(err, rows) {
				if (err) {
						console.log(err);
						return next("Mysql error on register, check your query");
				}
 				
 				algos.createSendToken(data, req, res)
			});
		});
    });
})

app.post('/login', function(req, res, next) {

	//validation
	req.assert('email', 'Email is required').notEmpty();
	req.assert('password', 'Password is required').notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		res.status(422).json(errors);
		return;
	}

	//get email from the request
	var data = {
		email: req.body.email,
		password: req.body.password
	};

	connection.query('SELECT * FROM USERS WHERE email = ?', data.email, function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error on connection, check your query");
		}

		if(rows.length !== 1)
			return res.status(401).send({message: 'Wrong email/password !'});

	
		algos.comparePasswords(req.body.password, rows[0].password, function(err, isMatch) {
			if(err) throw err;

			if(!isMatch)
				return res.status(401).send({message: 'Wrong email/password !'});

			algos.createSendToken(data, req, res)

		});

	});
});

app.post('/add/todo', function(req, res, next) {

	//validation
	req.assert('email', 'Email is required').notEmpty();
	req.assert('mytodo', 'mytodo is required').notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		res.status(422).json(errors);
		return;
	}

	//get email from the request
	var data = {
		email: req.body.email,
		mytodo: req.body.mytodo
	};

	connection.query('SELECT * FROM USERS WHERE email = ?', data.email, function(err, rows) {
		var id_owner = null
		if (err) {
			console.log(err);
			return next("Mysql error on connection, check your query");
		}

		if(rows.length !== 1)
			return res.status(401).send({message: 'Wrong email/password !'});

		if(rows.length == 1)
			id_owner = rows[0].id_user;
		data.mytodo.id_owner = id_owner

	});

	connection.query("INSERT INTO TODO SET ?", data.mytodo, function(err, rows) {
				if (err) {
						console.log(err);
						return next("Mysql error on insert, check your query : " + );
				}
 				
 				algos.createSendToken(data, req, res)
			});
});

var todos = [
	'JWT Decode',
	'Login',
	'PasseportJS',
	'Email verification'
];

app.get('add/todo', function(req, res, next) {
	auth.checkAuthorization(req, res, jwt)

	//res.json(todos);
})

app.get('/todos', function(req, res, next) {
	auth.checkAuthorization(req, res, jwt)

	res.json(todos);
})

/**
* Génere le lien url pour le TODO partagé avec un étranger, l'ajoute à la BD et le renvoie au client
* Le lien est généré à partir de l'id et d'une clé : todo pour un todo et todolist pour une liste (ici todo)
*/
app.get('/share/todo/:id', function(req, res, next) {
    
    console.log("/share/todo/:id = "+req.params.id);

    auth.checkAuthorization(req, res, jwt)

	share.createHash(req.params.id+"todo", function(err, data){

		var content = {
			id_reference: req.params.id,
			url: data
		}

		connection.query('INSERT INTO SHARE_OUTSIDER SET ?', content, function(err, rows) {
			if (err) {
				console.log(err);
				res.status(401).json({error: "Une erreur est survenue pendant la création de l'url!", content: err});
			}
			
			res.status(200).json(content);
		});
	})
})

/**
* Génere le lien url pour le TODO partagé avec un étranger, l'ajoute à la BD et le renvoie au client
* Le lien est généré à partir de l'id et d'une clé : todo pour un todo et todolist pour une liste (ici todolist)
*/
app.get('/share/todolist/:id', function(req, res, next) {
    
    console.log("/share/todolist/:id = "+req.params.id);

    auth.checkAuthorization(req, res, jwt)

	share.createHash(req.params.id+"todolist", function(err, data){

		var content = {
			id_reference: req.params.id,
			url: data
		}

		connection.query('INSERT INTO SHARE_OUTSIDER SET ?', content, function(err, rows) {
			if (err) {
				console.log(err);
				res.status(401).json({error: "Une erreur est survenue pendant la création de l'url!", content: err});
			}
			
			res.status(200).json(content);
		});
	})
})

var server = app.listen(3000, function() {
	console.log('api listening on port', server.address().port);
})

module.exports = app;