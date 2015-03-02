var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var expressValidator = require('express-validator');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

var algos = require('./models/algos.js')

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
						return next("Mysql error, check your query");
				}
 				
 				algos.createSendToken(data, req, res)
			});
		});
    });
})

app.post('/todolist', function(req, res, next) {
	//var objBD = BD();

	//validation


	//req.assert('name', 'Name is required').notEmpty();
	//req.assert('description', 'description is required').notEmpty();
	//req.assert('color', 'color is required').notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		
		res.status(422).json(errors);
		return;
	}

	//get data from the request
	var data = {
		name: req.body.name,
		description: req.body.description,
		color: req.body.color
	};
	console.info(req.body);

	
	//does the job : inserting data into mysql
	connection.query('INSERT INTO TODOLIST SET ?', data, function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}
		res.sendStatus(200);
	});

});

app.get('/listtodolist', function(req, res) {
	// retourne le non et le nombre de votre

	connection.query('SELECT * FROM TODOLIST',function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}else{
			console.info(rows);
			res.json(rows);
		}
		
	});

});

app.delete('/listtodolist/:id', function(req, res) {
	console.log(req.params.id);
    connection.query('DELETE FROM TODOLIST WHERE id_list = ?',req.params.id ,function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}
		
	});

  });

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
			return next("Mysql error, check your query");
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


var todos = [
	'JWT Decode',
	'Login',
	'PasseportJS',
	'Email verification'
];



app.get('/todos', function(req, res, next) {
	if (!req.headers.authorization) {
		return res.status(401).send({
			message: 'You are not authorized !'
		});
	}

	var token = req.headers.authorization.split(' ')[1];
	var payload = jwt.decode(token, "AGKYW");

	console.log('token after get :', token);
	console.log('payload.iss after get :', payload.iss);
	console.log('payload.sub after get :', payload.sub);


	if(!payload.sub){
	    res.status(401).send({
	        message: 'Authentication failed'
	    });
	}

	if (!req.headers.authorization) {
		return res.status(401).send({
			message: 'You are not authorized'
		});
	}

	res.json(todos);
})


var server = app.listen(3000, function() {
	console.log('api listening on port', server.address().port);
})

module.exports = app;
