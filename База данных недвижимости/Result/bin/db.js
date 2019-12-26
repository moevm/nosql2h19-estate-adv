var fs = require("fs");
var rq = require("./requests");


// Прослойка между сервером и 
class Data{
	//Для каждого запроса создаётся doЗапрос и иногда (в случае использования в запросе id(), count()...) parseЗапрос

	
	doFlats(res, params, end){
			rq.flats(
			res,
			(res, result)=>{end(res, this.parseClassic(result));},
			params
		);
	}
	
	
	doGetUsedMetro(res, params, end){
			rq.getUsedMetro(
			res,
			(res, result)=>{end(res, this.parseClassic(result));},
			params
		);
	}
	
	
	doFlatsFilter(res, params, end){
			rq.flatsFilter(
			res,
			(res, result)=>{end(res, this.parseClassic(result));},
			params
		);
	}
	
	
	parseFlatsFilter(result){
		let ret = [];
		for (let i in result.records)
			ret.push(result.records[i]._fields);
		if (ret.length==0) ret.push(null);
		return ret;
	}
	
	
	doGetMetro(res, params, end){
			rq.getMetro(
			res,
			(res, result)=>{end(res, this.parseClassic(result));},
			params
		);
	}
	
	
	doAddMetro(res, params, end){
			rq.addMetro(
			res,
			(res, result)=>{end(res, this.parseClassic(result));},
			params
		);
	}
	
	
	doAddSell(res, params, end){
			rq.addSell(
			res,
			(res, result)=>{end(res, this.parseClassic(result));},
			params
		);
	}
	
	doGetRooms(res, params, end){
			rq.getRooms(
			res,
			(res, result)=>{end(res, this.parseGetRooms(result));},
			params
		);
	}
	parseGetRooms(result){
		let ret = [];
		for (let i in result.records){
			ret.push(
				[
					result.records[i]._fields[0].low,
					result.records[i]._fields[1].low,
				]
			);
		}
		return ret;
	}
	
	
	hello(res, params, end){
			rq.hello(
			res,
			(res, result)=>{end(res, this.parseClassic(result));},
			params
		);
	}
	
	//Классический переводчик "ответ neo4j -> json"
	parseClassic(result){
		let ret = [];
		for (let i in result.records)
			ret.push(result.records[i]._fields);
		return ret;
	}

	

	// Пример распарсивания запроса MATCH (n) return n.name, id(n):
	/*
	parseQQQ(result){
		let ret = [];
		for (let i in result.records){
			// Разница только в аргументе для ret.push
			ret.push(
				[
					result.records[i]._fields[0],
					result.records[i]._fields[1].low //Для всяких id(), cost(), avg()... в запросе
				]
			);
		}
	}
	*/
};



module.exports = new Data();
