'use strict';

var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');


var auth = require('../models/auth.js');


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
var strategyOptionsLogin = {
	usernameField: 'email',
	passReqToCallback: true
};

exports.login = new LocalStrategy(strategyOptionsLogin, function(req, email, password, done) {

	//validation
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		return done(errors);
	}

	var data = {
		email: email
	};

	connection.query('SELECT * FROM USERS WHERE email = ?', data.email, function(err, rows) {
		if (err) {
			return done(err);
		}

		if (rows.length !== 1) {
			return done(null, false, {
				message: 'This email is not registered in our database !'
			});
		}

		auth.comparePasswords(password, rows[0].password, function(err, isMatch) {
			if (err) {
				return done(err);
			}

			if (!isMatch) {
				return done(null, false, {
					message: "The password doesn't match !"
				});
			}

			return done(null, rows[0]);
		});

	});
});

var strategyOptionsRegister = {
	usernameField: 'username',
	passReqToCallback: true,
	passResToCallback: true
};

exports.register = new LocalStrategy(strategyOptionsRegister, function(req, username, password, done) {
	console.log("Deb")
	//validation
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();

	req.checkBody('email', 'A valid email is required').isEmail();
	req.checkBody('password', 'Enter a password 1 - 20').len(1, 20);
	var errors = req.validationErrors();
	if (errors) {
		//return res.status(422).json(errors);
		return done(errors);
	}

	//get data from the request
	var data = {
		username: username,
		email: req.body.email,
		password: password
	};

	//Hash passwords
	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			return done(err);
		}

		// Store hash in your password DB.
		bcrypt.hash(password, salt, null, function(err, hash) {
			if (err) {
				return done(err);
			}

			data.password = hash;

			//insertion 
			connection.query('INSERT INTO USERS SET ?', data, function(err, rows) {
				if (err) {
					return done(null, false, {
						message: 'Mysql error, check your query !'
					});
				}
				// to return all the info in rows[0]
				connection.query('SELECT * FROM USERS WHERE email = ?', data.email, function(err, rows) {
					if (err) {
						return done(null, false, {
							message: 'Email not found !'
						});
					}
					var todolist = {
						name : "My List",
						description: "This is your first list of Todo.",
						color : "#7c7c7c",
						id_owner : rows[0].id_user
					}
					connection.query('INSERT INTO TODOLIST SET ?', todolist, function(err, data) {
						if (err) {
								return done(null, false, {
									message:"Mysql error on creating first user list, check your query" 
								});
						}
					});
					return done(null, rows[0]);
				});
			});
		});
	});
});
