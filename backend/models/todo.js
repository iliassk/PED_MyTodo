//Créer liste dans la base de donées
exports.todolist_post = function(req, res, next, connection, auth){
	//get data from the request
	var data = {
		name: req.body.name,
		description: req.body.description,
		color: req.body.color
	};

	connection.query('INSERT INTO CONTACT ?', data, function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}
		res.sendStatus(200);
	});
}

//Récupère les todos d'une liste
exports.listtodolist_id_get = function(req, res, next, connection, auth){
 	var data = {
		id: req.params.id
	};

	connection.query('SELECT * FROM TODO WHERE id_list = ?', data.id, function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}else{
			//console.info(rows);
			res.status(200).json(rows);
		}
	});  
}

exports.listtodolist_get = function(req, res, next, connection, auth){
   // retourne le non et le nombre de votre
	connection.query('SELECT * FROM TODOLIST',function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}else{
			//console.info(rows);
			res.status(200).json(rows);
		}
	});
}

exports.listtodolist_id_delete = function(req, res, next, connection, auth){
    connection.query('DELETE FROM TODOLIST WHERE id_list = ?',req.params.id ,function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}
		return res.status(200).json(rows)
	});
}

exports.todo_id_delete = function(req, res, next, connection, auth){
    connection.query('DELETE FROM TODO WHERE id_todo = ?', req.params.id, function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}
		return res.status(200).json(rows)
	});
}

exports.todo_id_put = function(req, res, next, connection, auth){
	connection.query('UPDATE TODO SET ? WHERE id_todo = ?', [req.body, req.params.id], function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}
		return res.status(200).json(rows)
	});
}

exports.todoadd_post = function(req, res, next, connection, auth){
	req.assert('mytodo', 'mytodo is required').notEmpty();
	var _id = auth.checkAuthorization(req, res, jwt);
	
	var errors = req.validationErrors();
	if (errors) {
		res.status(422).json(errors);
		return;
	}
	
	req.body.mytodo.id_owner = _id;

	connection.query("INSERT INTO TODO SET ?", req.body.mytodo, function(err, rows) {
		if (err) {
				console.log(err);
				return next("Mysql error on insert, check your query  ");
		}
		else
			return res.status(200);
	});
}

exports.todo_id_get = function(req, res, next, connection, auth){
   auth.checkAuthorization(req, res, jwt);

   	connection.query('SELECT * FROM TODO WHERE id_todo = ?', req.params.id, function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error on connection, check your query");
		}

		if(rows.length !== 1){
			return res.status(401).send({message: 'Error todo not unique !'});
		}

		if(rows.length == 1){
			console.log("MARCHE");
            return res.status(200).send(rows);
        }

	});
}

exports.sharetodo_id_get = function(req, res, next, connection, auth, share){
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
}

exports.sharetodolist_id_get = function(req, res, next, connection, auth, share){
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
}