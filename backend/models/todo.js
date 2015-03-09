//Créer liste dans la base de donées
exports.todolist_post = function(req, res, next, connection, auth, jwt){
	//get data from the request
	var _id = auth.checkAuthorization(req, res, jwt);
	var data = {
		name: req.body.name,
		description: req.body.description,
		color: req.body.color,
		id_owner: _id
	};

	connection.query('INSERT INTO TODOLIST SET ?', data, function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}
		res.sendStatus(200);
	});
}


//Récupère les informations d'une liste dans la base de donées
exports.todolist_get = function(req, res, next, connection, auth, jwt){
	//get data from the request
	var _id = auth.checkAuthorization(req, res, jwt);
	var _idlist = req.params.id;

	connection.query('SELECT * FROM TODOLIST WHERE id_list = ?', _idlist, function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}else{
			//console.info(rows);
			res.status(200).json(rows);
		}
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

exports.listtodolist_get = function(req, res, next, connection, auth, jwt){
   // retourne le non et le nombre de votre
	connection.query('SELECT * FROM TODOLIST WHERE id_owner = ?', auth.checkAuthorization(req, res, jwt), function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}else{
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

exports.todoadd_post = function(req, res, next, connection, auth, jwt){
	req.assert('mytodo', 'mytodo is required').notEmpty();
	var _id = auth.checkAuthorization(req, res, jwt);
	
	var errors = req.validationErrors();
	if (errors) {
		return res.status(422).json(errors);;
	}
	
	req.body.mytodo.id_owner = _id;

	connection.query("INSERT INTO TODO SET ?", req.body.mytodo, function(err, rows) {
		if (err) {
				console.log(err);
				return next("Mysql error on insert, check your query  ");
		}
		else
			return res.status(200).json(rows);
	});
}

exports.todo_id_get = function(req, res, next, connection, auth, jwt){
   auth.checkAuthorization(req, res, jwt);

   	connection.query('SELECT * FROM TODO WHERE id_todo = ?', req.params.id, function(err, rows) {
		if (err) {
			console.log(err);
			return next("Mysql error on connection, check your query");
		}

		if(rows.length == 0){
			return res.status(401).send({message: 'Error todo does not exist !'});
		}
		if(rows.length > 1){
			return res.status(401).send({message: 'Error todo with more than twice this id !'});
		}

		if(rows.length == 1){
            return res.status(200).send(rows);
        }

	});
}

exports.sharetodo_id_get = function(req, res, next, connection, auth, share, jwt){
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

exports.sharetodolist_id_get = function(req, res, next, connection, auth, share, jwt){
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

exports.listtodolistwithtodos_get = function(req, res, next, connection, auth, jwt){

	var result = new Array();
	var _id = auth.checkAuthorization(req, res, jwt);
	connection.query('SELECT * FROM TODOLIST WHERE id_owner = ?', _id , function(err, lists) {
		if (err) {
			console.log(err);
			return next("Mysql error, check your query");
		}else{
			result = lists;
			lists.forEach(function (elem, index, array) {
  				connection.query('SELECT * FROM TODO WHERE id_list = ?', elem.id_list, function(err, rows) {
					if (err) {
						console.log(err);
						return next("Mysql error on connection, check your query");
					}

				result[index].todos = rows;

				//pour gérer l'asynchrone on ne sait pas quand les requetes sont finies
				if(index == result.length-1)
					res.status(200).json(result);
				});


			})
		}
	});
}