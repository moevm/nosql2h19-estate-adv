var fs = require("fs");

class Requests{	

	flats(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`match (f:Flat) OPTIONAL MATCH (f)--(o:Owner), (f)--(m:Metro) \
			return f.rooms, f.footage, f.price, f.description, o.FIO, o.telephone, m.name, f.picture;`,
			res,
			func
		);
	}


	getUsedMetro(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (m:Metro)--() return DISTINCT m.name;`,
			res,
			func
		);
	}
	
	
	flatsFilter(res, func = this.standartFinal, params = {}){
		
		if (params.all){
			this.doRequest(
				`match (f:Flat)--(m:Metro) OPTIONAL MATCH (f)--(o:Owner) return f.rooms, f.footage, f.price, f.description, o.FIO, o.telephone, m.name, f.picture;`,
				res,
				func
			);
			return;
		}
		
		
		let station = params.metro="_notExisteableStation_" ? "" : `{name:"${params.metro}"}`;
		
		
		let match = `match (f:Flat)--(m:Metro${station})`;
		let where = "WHERE";
		let ret = "OPTIONAL MATCH (f)--(o:Owner) return f.rooms, f.footage, f.price, f.description, o.FIO, o.telephone, m.name, f.picture;";
		
		let rooms = [];
		if (params.r1) rooms.push(1);
		if (params.r2) rooms.push(2);
		if (params.r3) rooms.push(3);
		
		where += ` (f.rooms in [${rooms}] `;
		
		if (params.r4) where += ` OR f.rooms >= 4 `;
		
		where += `) AND f.price >= ${params.minPrice} AND f.price <= ${params.maxPrice} `;
		where += ` AND f.footage >= ${params.minFootage} AND f.footage <= ${params.maxFootage} `
		
		this.doRequest(
			`${match} ${where} ${ret}`,
			res,
			func
		);
	}
	
	
	getMetro(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (m:Metro) return m.name;`,
			res,
			func
		);
	}
	
	
	addMetro(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MERGE (m:Metro{name:"${params.name}"});`,
			res,
			func
		);
	}
	
	
	addSell(res, func = this.standartFinal, params = {}){
		
		this.doRequest(
			`MATCH (m:Metro{name:'${params.metro}'}) \
			MERGE (o:Owner{FIO:"${params.name}", telephone:"${params.phone}"}) \
			CREATE (f:Flat{\
				description:"${params.description}", \
				rooms:${params.rooms},\
				footage:${params.footage},\
				picture:"${params.pic}",\
				price:${params.price}\
			}), \
			(f)-[:Own]->(o), (f)-[:Near]->(m);`,
			res,
			func
		);
	}
	
	
	getRooms(res, func = this.standartFinal, params = {}){
		this.doRequest(
			`MATCH (m:Metro{name:"${params.station}"}) OPTIONAL MATCH (m)--(f:Flat) RETURN f.rooms, count(f) ORDER BY f.rooms;`,
			res,
			func
		);
	}
	
	
	hello(res, func = this.standartFinal, params = {}){
		this.doRequest(
			params.text,
			res,
			func
		);
	}
	
	//////////////////////////////////////////////////
	///////////D/a/r/k///T/L///m/a/g/i/c//////////////
	//////////////////////////////////////////////////
	//"Берёшь запрос и посылаешь Болту. В случае чего
	//   пни Функа - он будет знать что делать с результатом"
	doRequest(request, res, func=this.standartFinal){
		const neo4j = require('neo4j-driver').v1;

		const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "12345"));
		const session = driver.session();

		const resultPromise = session.run(
			request
		);

		resultPromise.then(result => {
		  session.close();
		  driver.close();
		  func(res, result);
		});
	}
	
	//Затычка на "выполнил запрос - изволь доложить клиенту"
	standartFinal(res){
		res.end();
		res.status(200);
	}
};

module.exports = new Requests();
