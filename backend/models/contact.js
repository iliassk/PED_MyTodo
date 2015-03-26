exports.addcontact_post = function(req, res, jwt, next, connection, auth){
	//get data from the request
	var _id = auth.checkAuthorization(req, res, jwt);
	
	var data = {
		id_user: _id,
		id_group : req.body.item,
		id_contact: req.body.id
	};

	connection.query('INSERT INTO CONTACTS SET ?', data, function(err, rows) {
		if (err) {
			console.log(data);
			console.log(err);
			return next("Mysql error, check your query");
		}else{
			console.log(data);
			return res.sendStatus(200);
		}
	});
}

exports.userid_get = function(req, res, next, connection, auth){
var id_user = req.params.id
connection.query('SELECT u.id_user, u.avatar_path, u.username, u.email FROM USERS u WHERE u.id_user = ?', id_user, function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}else{
			//console.info(rows);
			return res.status(200).json(rows);
		}
	});

}

exports.userslist_get = function(req, res, next, connection, auth){
   
   	
	connection.query('SELECT u.id_user, u.email, u.username, u.avatar_path FROM USERS u WHERE u.id_user NOT IN ( SELECT id_user FROM CONTACTS)',function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}else{
			return res.status(200).json(rows);
		}
	});
}

exports.addgroup_post = function(req, res, next, connection, auth, jwt){
	//get data from the request
	var _id = auth.checkAuthorization(req, res, jwt);
	var data = {
		name: req.body.name,
		id_owner: _id
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

exports.listgroupe_get = function(req, res, next, connection, auth, jwt){
   // retourne le non et le nombre de votre
   	var _id = auth.checkAuthorization(req, res, jwt);
   	var cpt = 0;
	connection.query('SELECT * FROM GROUPS WHERE id_owner = ?', _id,function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}else{
			console.log(rows);

		result = rows;
		
		rows.forEach(function (elem, index, array) {
				connection.query('SELECT u.id_user, u.username, u.avatar_path, u.email FROM USERS u JOIN CONTACTS ON u.id_user = CONTACTS.id_contact WHERE CONTACTS.id_group = ?', elem.id_group, function(err, contacts) {
				if (err) {
					console.log(err);
					return next("Mysql error on connection, check your query");
				}

				result[index].contact = contacts;
				cpt ++;
				//pour gérer l'asynchrone on ne sait pas quand les requetes sont finies
				if(cpt == result.length){

					return res.status(200).json(result);
				}
			});
		})
		if(rows.length == 0)
			return res.status(200).json(result);
		}
	});
}

exports.listuserNocontact_id_get = function(req, res, jwt, next, connection, auth){
   // retourne le non et le nombre de votre
   	//chaine = "SELECT * FROM CONTACTS C, USERS U, GROUPS G WHERE C.id_user=U.id_user AND C.id_group=G.id_group"
	var _id = auth.checkAuthorization(req, res, jwt);
   
   	var chaine = "SELECT u.id_user, u.username, u.avatar_path, u.email FROM USERS u WHERE u.id_user !="+req.params.id+" AND u.id_user NOT IN(SELECT c.id_contact FROM CONTACTS c WHERE c.id_user ="+_id+")"
	
	connection.query(chaine,function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}else{
			console.info("rows: "+rows);
			return res.status(200).json(rows);
		}
	});
}

exports.deletecontact_delete = function(req, res, jwt, next, connection, auth){


	var chaine = "DELETE FROM CONTACTS WHERE id_contact="+req.params.id
	connection.query(chaine,function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}else{
			return	res.status(200).json(rows);
		}
	});

}

exports.deletegroup_delete = function(req, res, jwt, next, connection, auth){

connection.query('DELETE FROM CONTACTS WHERE id_group = ?',req.params.id ,function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}
		else{
			connection.query('DELETE FROM GROUPS WHERE id_group = ?',req.params.id ,function(err, rows) {
			if (err) {
				console.log(err);
			return next("Mysql error, check your query");
			}
		return res.status(200).json(rows)
	});
		}
	
	});


}