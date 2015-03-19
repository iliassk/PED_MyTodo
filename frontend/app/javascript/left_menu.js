



function toggle(anId)
{
	var node = document.getElementById(anId);
	
	if (node.id=="listTodo")
	{

		$("#groupe").children().hide();
		$("#sharedToDo").children().hide();
		$("#listTodo").children().show();
		// Contenu caché, le montrer
		node.style.visibility = "visible";
		node.style.height = "auto";

		document.getElementById("groupe").style.visibility = "hidden";
		document.getElementById("groupe").style.height = "0";
		document.getElementById("addgroup").style.visibility = "hidden";
		document.getElementById("addgroup").style.height = "0";
		document.getElementById("sharedToDo").style.visibility = "hidden"
		document.getElementById("sharedToDo").style.height = "0"
	
					
	}
	if(node.id=="groupe")
	{
		$("#listTodo").children().hide();
		$("#sharedToDo").children().hide();
		$("#groupe").children().show();
		node.style.visibility = "visible";
		node.style.height = "auto";

		document.getElementById("listTodo").style.visibility = "hidden"
		document.getElementById("listTodo").style.height = "0"
		document.getElementById("sharedToDo").style.visibility = "hidden"
		document.getElementById("sharedToDo").style.height = "0"
		// Contenu visible, le cacher
					// Optionnel libérer l'espace
	}
	if(node.id=="sharedToDo")
	{
		$("#listTodo").children().hide();
		$("#groupe").children().hide();
		$("#sharedToDo").children().show();

		node.style.visibility = "visible";
		node.style.height = "auto";

		document.getElementById("listTodo").style.visibility = "hidden"
		document.getElementById("listTodo").style.height = "0"
		document.getElementById("groupe").style.visibility = "hidden"
		document.getElementById("groupe").style.height = "0"
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