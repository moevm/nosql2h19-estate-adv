function getMetro(){	
	$("#stations").find('tr').remove();
	ajaxPost(
		"/getMetro",
		{},
		rewriteTable
	);
}
function addMetro(){
	body = {}
	if (!$("#name").val()) {alert("Введи название станции");return;}
	
	ajaxPost(
		"/addMetro",
		{name: $("#name").val()},
		getMetro
	);
}


function rewriteTable(strs){
	for (let i in strs){
		str = strs[i];
		$("#stations").append(`<tr><td>${str[0]}</td></tr>`);
	}
}