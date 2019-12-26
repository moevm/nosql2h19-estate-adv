function getRooms(){
	$("#metro").attr("disabled","");
	ajaxPost(
		"/getRooms",
		{station: $("#metro").val()},
		(req)=>{
			$("#container").empty();
			var chart = anychart.pie(req);
			//set chart title
			chart.title("Разнокомнатные квартиры");
			//set chart container and draw
			chart.container("container").draw();
			//$(".anychart-credits").remove();
			$("#metro").removeAttr("disabled");
		}
	);
}