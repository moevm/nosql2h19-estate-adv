function minPriceChanged(){
	$("#maxPrice").attr("min",`${$("#minPrice").val()}`);
}

function maxPriceChanged(){
	$("#minPrice").attr("max",`${$("#maxPrice").val()}`);
}

function minFootageChanged(){
	$("#maxFootage").attr("min",`${$("#minFootage").val()}`);
}

function maxFootageChanged(){
	$("#minFootage").attr("max",`${$("#maxFootage").val()}`);
}