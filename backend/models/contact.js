exports.addcontact_post = function(req, res, next, connection, auth){
	//get data from the request
	var data = {
		id_user: req.body.id,
		id_group : req.body.item
	};

	connection.query('INSERT INTO CONTACTS SET ?', data, function(err, rows) {
		if (err) {
			console.log(data);
			console.log(err);
			return next("Mysql error, check your query");
		}else{
			console.log(data);
		res.sendStatus(200);
		}
	});
}

exports.userslist_get = function(req, res, next, connection, auth){
   
   	
	connection.query('SELECT u.id_user, u.email, u.username, u.avatar_path FROM USERS u WHERE u.id_user NOT IN ( SELECT id_user FROM CONTACTS)',function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}else{
			res.status(200).json(rows);
		}
	});
}

exports.addgroup_post = function(req, res, next, connection, auth){
	//get data from the request
	var data = {
		name: req.body.name
	};

	connection.query('INSERT INTO GROUPS SET ?', data, function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}else{
		res.sendStatus(200);
		}
	});
}


exports.listgroupe_get = function(req, res, next, connection, auth){
   // retourne le non et le nombre de votre
   	
	connection.query('SELECT * FROM GROUPS',function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}else{
			//console.info(rows);
			res.status(200).json(rows);
		}
	});
}

exports.listcontact_get = function(req, res, next, connection, auth){
   // retourne le non et le nombre de votre
   	chaine = "SELECT * FROM CONTACTS C, USERS U, GROUPS G WHERE C.id_user=U.id_user AND C.id_group=G.id_group"
	connection.query(chaine,function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}else{
			//console.info(rows);
			res.status(200).json(rows);
		}
	});
}