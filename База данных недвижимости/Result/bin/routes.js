const express = require("express");
const multer  = require("multer");
var   fs      = require("fs");
const db     = require("./db");
const router  = express.Router();

const upload = multer({dest:"public/images"});


router.use("/public", express.static('public'));



{//Обработчики запросов клиентов
	// Шаблон:
	// router.<type>("/<name>", (req, res) =>{
	// 		db.do<Name>(res, req.body, <func>);
	// });


	router.post("/getBuy", (req, res)=>{
		db.doFlatsFilter(res, req.body, (res, ans)=>{res.render("flats", {flats: ans, flag: true});});
	});
	
	router.post("/getMetro", (req, res)=>{
		db.doGetMetro(res, req.body, classicEnd);
	});
	
	router.post("/addMetro", (req, res)=>{
		db.doAddMetro(res, req.body, classicEnd);
	});
	
	router.post("/getRooms", (req, res)=>{
		db.doGetRooms(res, req.body, classicEnd);
	});
	
	router.post("/addSell", upload.single("picture"), (req, res, next)=>{
		let filedata = req.file;
		
		req.body.pic = `${filedata.filename}.${filedata.mimetype.split("/")[1]}`;
		
		fs.rename(`./public/images/${filedata.filename}`, `./public/images/${req.body.pic}`, function(err) {
				if ( err ) 
					console.log('ERROR: ' + err);
				else
					db.doAddSell(res, req.body, (res)=>{res.render("selled")});
		});
	});
	
	router.post("/hello", (req, res)=>{
		db.hello(res, req.body, classicEnd);
	});
	
	classicEnd = (res,answer)=>{res.json(answer); res.status(200);};
}






{//Базовая адресация:
	//Открытие начальной страницы
	router.get("/", (req, res) => {
		res.render('main');
	});
	
	
	//Шаблоны
	////////////////////////////////////////////////////////////////////////////////
	//\\\\\\\ Фиксированный набор адресов (для шаблонов с определёнными параметрами)
	// Шаблон:
	// router.get("/<name>", (req, res) =>{
	// 		res.render("<name>", {<json-object>});
	// });
	
	router.get("/buy", (req,res)=>{
		db.doGetUsedMetro(res, req.body, (res, ans)=>{res.render("buy", {stations: ans});});
	});
	router.get("/sell", (req,res)=>{
		db.doGetMetro(res, req.body, (res, ans)=>{res.render("sell", {stations: ans});});
	});
	router.get("/flats", (req, res) => {
		db.doFlats(res, req.body, (res, ans)=>{res.render("flats", {flats: ans, flag: true});});
	});
	router.get("/statistic", (req, res) => {
		db.doGetUsedMetro(res, req.body, (res, ans)=>{res.render("statistic", {stations: ans});});
	});
	//\\\\\\\
	///////////
	
	
	///////////////////////////////////////////////////////////////////////////////////////
	//\\\\\\\ Для всего остального - ищем pug или html страницу с соответствующим названием
	//Открытие стрицы а-ля ":3000/`page`"
	router.get("/:name", (req, res) => {
		//Есть ли такой pug
		fs.access(__dirname+`/../views/${req.params.name}.pug`, (error)=>{
		if (error) {
			//Pug нет, но есть ли такой html-ник
			fs.access(__dirname+`/../public/html/${req.params.name}.html`, (error)=>{
			if (error) {
				res.status(404);
				res.end("Resourse not found!");
			} else {
				res.sendFile(req.params.name+".html", {root: "public/html"});
			}});
		} else {
			res.render(req.params.name);
		}});
	});
}


module.exports = router;
