var express = require('express');
var bodyParser = require('body-parser');
var csv = require("fast-csv");
var fs = require("fs");
var router = express.Router();

const path = require('path');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
//import createReport from 'docx-templates';
 

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/../views/imss/operaciones.html'));
});
router.post('/alta', function(req, res) {
   fecha=req.body.fecha
   nombre=req.body.nombre
   ap1=req.body.ap1
   ap2=req.body.ap2
   NSS=req.body.nss
   curp=req.body.curp

   name=reemplazarAcentos(nombre)
 	ap1=reemplazarAcentos(ap1)
 	ap2=reemplazarAcentos(ap2)
 	curp=curp
 	fill="";
 	alta="Y5845183325";
 	if(NSS.length!=11){NSS=digitoNSS(NSS)}
 	alta=alta+NSS;
 	alta=alta+ap1.padEnd(27, ' ')+ap2.padEnd(27, ' ')+name.padEnd(27, ' ')
 	+"00000000000021022062019000  08     0000000000 "+curp+"9"+"\n\r";
 	//+fechaalta+"     02"+"     00000000006"+curp+"9"+"\n\r";

 	if(alta.length!=170){ console.log("Error longitud",alta.length,alta)}
 	else{
 		csvwrite+=alta;
 	}

   console.log(fecha,nombre,ap1,ap2,NSS,curp)
   res.send(alta)
});
router.post('/baja', function(req, res) {
   fecha=req.body.fecha
   nombre=reemplazarAcentos(req.body.nombre)
   ap1=reemplazarAcentos(req.body.ap1)
   ap2=reemplazarAcentos(req.body.ap2)
   NSS=reemplazarAcentos(req.body.nss)
   curp=reemplazarAcentos(req.body.curp)
   baja="Y5845183325";
 	if(NSS.length!=11){NSS=digitoNSS(NSS)}
 	baja=baja+NSS;
   baja=baja+ap1.padEnd(27, ' ')+ap2.padEnd(27, ' ')+nombre.padEnd(27, ' ')+"000000000000000"
 	+fecha+"     02"+"     00000000006"+curp+"9"+"\n\r";
 	 	fs.writeFile(__dirname+'/../public/imss/bajas.txt', baja, function(err) {
 	 		 console.log(fecha,nombre,ap1,ap2,NSS,curp)
   			//res.send("baja")
		    if(err) {
		        return console.log("error:",err);
		    }
		    res.download(__dirname+'/../public/imss/bajas.txt');
		    console.log("DONE BAJAS");
		});
  
});


function digitoNSS(NSS){
 	//http://www.cuidatupatrimonio.com/blog/conformacion-del-nss-y-calculo-del-digito-verificador/
 	nssnum=NSS.split("");
 	//console.log(nssnum)
 	mult=[1,2,1,2,1,2,1,2,1,2];
 	for(i=0;i<10;i++){
 		nssnum[i]=parseFloat(nssnum[i])*parseFloat(mult[i]);
 		if(String(nssnum[i]).length>1 ){
 			res=String(nssnum[i]).split("");
 			nssnum[i]=parseFloat(res[0])+parseFloat(res[1]);
 		}

 	}
 	sum=0;
 	for(i=0;i<10;i++){
 		sum+=parseFloat(nssnum[i]);
 	}
 	ceiling=Math.ceil(sum/10)*10
 	cv=ceiling-sum;
 	//console.log(NSS,cv)
 	return String(NSS)+String(cv);
 }
// define the about route
function reemplazarAcentos(cadena)
{
	cadena=cadena.toUpperCase();
	var cadena = cadena.replace("Ñ", "N");
	var cadena = cadena.replace("Ü", "U");
	var chars={
		"á":"a", "é":"e", "í":"i", "ó":"o", "ú":"u",
		"à":"a", "è":"e", "ì":"i", "ò":"o", "ù":"u",
		"Á":"A", "É":"E", "Í":"I", "Ó":"O", "Ú":"U",
		"À":"A", "È":"E", "Ì":"I", "Ò":"O", "Ù":"U","Ã‘":"Ñ" }
	var expr=/[áàéèíìóòúù]/ig;
	var res=cadena.replace(expr,function(e){return chars[e]});
	res=res.toUpperCase();
	return res;
}

module.exports = router;