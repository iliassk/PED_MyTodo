exports.userslist_get = function(req, res, next, connection, auth){
   // retourne le non et le nombre de votre
   	
	connection.query('SELECT * FROM USERS',function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}else{
			console.log("reussi");
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