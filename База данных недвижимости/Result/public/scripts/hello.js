function hello(){	
	$("#req").find('tr').remove();
	ajaxPost(
		"/hello",
		{text: $("#text").val()},
		rewriteTable
	);
}


function rewriteTable(strs){
	
	// console.log(strs[0].length)
	
	// for (let i in strs){
		// str = strs[i];
		// $("#req").append(`<tr><td>${str}</td></tr>`);
		
	// }
	for (str of strs){
		$("#req").append('<tr>');
		console.log(str[0])
		let pr = str[0].properties;
		for (el in pr){
			if (pr[el].low) $("#req").append(`<td style="border: 1px solid black">${pr[el].low}</td>`);
			else			$("#req").append(`<td style="border: 1px solid black">${pr[el]    }</td>`);
		}
		$("#req").append('</tr>');
	}
}