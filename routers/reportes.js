	var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var csv = require("fast-csv");
var router = express.Router();
router.use( bodyParser.json() );
const createReport = require('docx-templates').default;
//import createReport from 'docx-templates';
 

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('reportes');
});
// define the about route
router.get('/clc', function(req, res) {
	DICC=[];
	csv
	 .fromPath("staticDB/pagos.csv",{ delimiter:';'})
	 .on("data", function(data){
	 	DICC.push(data[0],data[3],data[4])
	     
	 })
	 .on("end", function(){
	     res.send();
	 });
	
});
router.post('/clc', function(req, res) {
	console.log(req.body);
	data=req.body.data
	name='reportes/uola.docx';
	createReport({
	  template: 'docxTemplates/oficio.docx',
	  output: name,
	  data: data,
	});
	console.log("reporte")
	res.send( '<a href="'+name+'" download>DESCARGAR</a>' ) 
});
router.get('/makeall', function(req, res) {
	makeallFlolios();
});

function makeallFlolios(){
DINAMO=[];

	csv
 .fromPath("public/CLC-OFICIOS.csv",{ delimiter:','})
 .on("data", function(data){
 	fecha=data[1].trim();
 	oficio=data[7].trim();
 	beneficiarios=data[4].trim();
 	importe=data[3].trim();
 	filename="reportes/folios/FOLIO_"+data[0]+".docx";

 	mongoose={
  			oficio: oficio,
		  beneficiarios: beneficiarios,
		  importe: importe,
		  fecha: fecha,
		  name: filename
  		}
 	DINAMO.push(mongoose);
 	//console.log(alta,data);
 })	
 .on("end", function(){
 	var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
 	for(i=0;i<DINAMO.length;i++){
 		moon=DINAMO[i];
 		if(moon.fecha.length>=2 && moon.oficio.length>=2){
 			hh=moon.fecha.split("/");
 			month=meses[parseFloat(hh[1])-1]
 			fechstr="Ciudad de México "+hh[0]+" de "+month+" de 20"+hh[2];
 			moon.fecha=fechstr;
 			console.log(moon.fecha,moon.oficio)
 			//nufech=moment(fecha).format('LL');
 			//moon.fecha=nufech;
 			//moment().format('LL')
 			createReport({
			  template: 'docxTemplates/oficionuevo.docx',
			  output: moon.name,
			  data: moon,
			});
 		}
 		
 	}

 })


}


module.exports = router;