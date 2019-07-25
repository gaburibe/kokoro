var express = require('express');
var moment = require('moment');
moment.locale("es");
var app = express();
var fs = require('fs');
const path = require('path');
var ip = require("ip");
//ROUTES
var birds = require('./routers/birds');
var jollyroger = require('./routers/jollyroger');
var reportes = require('./routers/reportes');
var editor = require('./routers/editor');
var imss = require('./routers/imss');
//HELPERS
var helpers = require('./helpers/filesys');

var fecha = new Date();
var options = { year: 'numeric', month: 'long', day: 'numeric' };

console.log(
  moment().format('LL')
);

console.dir ( ip.address() );
console.log( helpers.myDateTime() )
app.set('view engine', 'hbs')
app.use(express.static('public'));
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res, next) {
  //res.send('hello world');
  next();

});
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/views/index/index.html'));
  //__dirname : It will resolve to your project folder.
});
app.get('/seg',function(req,res){
  res.sendFile(path.join(__dirname+'/views/index/seg.html'));
  //__dirname : It will resolve to your project folder.
});
app.get('/oficios',function(req,res){
  res.sendFile(path.join(__dirname+'/views/index/oficios.html'));
  //__dirname : It will resolve to your project folder.
});
app.get('/download', function(req, res) {
	console.log(req.query.file)
  res.send(req.query.file);
});



app.use('/birds', birds);
app.use('/jollyroger', jollyroger);
app.use('/reportes', reportes);
app.use('/editor', editor);
app.use('/imss', imss);
// GET method route
// app.get('/', function (req, res) {
//   res.send('GET request to the homepage');
// });


// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage',process.env.PORT);
});
app.listen(process.env.PORT || 1313)
//app.listen(1313);