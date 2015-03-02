function toggle(anId)
{
	var node = document.getElementById(anId);
	
	if (node.id=="listTodo")
	{
		// Contenu caché, le montrer
		node.style.visibility = "visible";
		node.style.height = "auto";
		document.getElementById("groupe").style.visibility = "hidden"
					
	}
	if(node.id=="groupe")
	{

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
	var node = document.getElementById(anId);
	
	if (node.id=="listTodo")
	{
		// Contenu caché, le montrer
		node.style.visibility = "visible";
		node.style.height = "auto";
		document.getElementById("groupe").style.visibility = "hidden"
					
	}
	if(node.id=="groupe")
	{

		node.style.visibility = "visible";
		node.style.height = "auto";
		document.getElementById("listTodo").style.visibility = "hidden"
		document.getElementById("listTodo").style.height = "0"
		// Contenu visible, le cacher
					// Optionnel libérer l'espace
	}
}