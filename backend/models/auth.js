exports.checkAuthorization = function(req, res, jwt){
    if (!req.headers.authorization) {
		return res.status(401).send({
			message: 'You are not authorized !'
		});
	}

	var token = req.headers.authorization.split(' ')[1];
	var payload = jwt.decode(token, "AGKYW");
	
	if(!payload.sub){
	    res.status(401).send({
	        message: 'Authentication failed'
	    });
	}

	return payload.sub;
}

createSendToken = function(data, connection, req, res, jwt) {
	connection.query('SELECT * FROM USERS WHERE email = ?', data.email, function(err, rows) {
		if (err) {
			console.log(err);
			return res.status(422).send({message: 'MYSQL error, check your query!'});
		}

		var payload = {
			iss: req.hostname,
			sub: rows[0].id_user
		}
		
		var token = jwt.encode(payload, "AGKYW");
		
		
		var data_sent = data;
		delete data_sent.password;

		return res.status(200).send({
			user: data_sent,
			token: token
		});
	});
}

comparePasswords = function(password, passwordDb, callback, bcrypt){
    bcrypt.compare(password, passwordDb, callback);
}

exports.register_post = function(req, res, next, connection, jwt, bcrypt){
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
			//#7c7c7c
			//insertion 
			connection.query('INSERT INTO USERS SET ?', data, function(err, rows) {
				if (err) {
						console.log(err);
						return next("Mysql error on register, check your query");
				}

				createSendToken(data, connection, req, res, jwt)
				connection.query('SELECT id_user FROM USERS WHERE email = ?', data.email, function(err, rows) {
					if (err) {
						console.log(err);
						res.status(422).send({message: 'MYSQL error, check your query!'});
					}

					if(rows.length !== 1)
						return res.status(401).send({message: 'Wrong email/password !'});

					var todolist = {
						name : "My List",
						description: "This is your first list of Todo.",
						color : "#7c7c7c",
						id_owner : rows[0].id_user
					}
					connection.query('INSERT INTO TODOLIST SET ?', todolist, function(err, rows) {
						if (err) {
								console.log(err);
								return next("Mysql error on creating first user list, check your query");
						}
					});

				});
			});
    	});
	});
}

exports.login_post = function(req, res, next, connection, jwt, bcrypt){

	//validation
	req.assert('email', 'Email is required').notEmpty();
	req.assert('password', 'Password is required').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		return res.status(422).json(errors);
	}

	//get email from the request
	var data = {
		email: req.body.email,
		password: req.body.password
	};

	connection.query('SELECT * FROM USERS WHERE email = ?', data.email, function(err, rows) {
		if (err) {
			console.log(err);
			res.status(422).send({message: 'MYSQL error, check your query!'});
		}

		if(rows.length !== 1)
			return res.status(401).send({message: 'Wrong email/password !'});

		comparePasswords(req.body.password, rows[0].password, function(err, isMatch) {
			if(err) throw err;

			if(!isMatch)
				return res.status(401).send({message: 'Wrong email/password !'});

			createSendToken(data, connection, req, res, jwt)

		}, bcrypt);
	});
}