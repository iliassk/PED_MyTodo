function toggle(anId)
{
	var node = document.getElementById(anId);
	
	if (node.id=="listTodo")
	{

		$("#groupe").children().hide();
		$("#listTodo").children().show();
		// Contenu caché, le montrer
		node.style.visibility = "visible";
		node.style.height = "auto";

		document.getElementById("groupe").style.visibility = "hidden";
		document.getElementById("groupe").style.height = "0";
		document.getElementById("addgroup").style.visibility = "hidden";
		document.getElementById("addgroup").style.height = "0";
	
					
	}
	if(node.id=="groupe")
	{
		$("#listTodo").children().hide();
		$("#groupe").children().show();
		node.style.visibility = "visible";
		node.style.height = "auto";

		document.getElementById("listTodo").style.visibility = "hidden"
		document.getElementById("listTodo").style.height = "0"
		// Contenu visible, le cacher
					// Optionnel libérer l'espace
	}
}

function groupe(obj)
{
	if(obj == "show"){
		document.getElementById("addgroup").style.visibility = "visible";
		document.getElementById("addgroup").style.height = "auto";
	}
	if(obj == "hide"){
		document.getElementById("addgroup").style.visibility = "hidden";
		document.getElementById("addgroup").style.height = "0";
	}
}