// Базовый интерфейс для всех запросов
function ajax(type="GET", name="/", body={}, func=()=>{}){
	$.ajax(name, {
		type: type,
		data: body,
		success: (req)=>{
			func(req);
		}
	});
}

//Набор шаблонов для всех стандартных типов запросов серверу
let ajaxPut     = (name, body={}, func=()=>{})=>{ajax("PUT"   , name, body, func)};
let ajaxGet     = (name, body={}, func=()=>{})=>{ajax("GET"   , name, body, func)};
let ajaxPost    = (name, body={}, func=()=>{})=>{ajax("POST"  , name, body, func)};
let ajaxDelete  = (name, body={}, func=()=>{})=>{ajax("DELETE", name, body, func)};