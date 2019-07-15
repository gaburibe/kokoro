var express = require('express');
var router = express.Router();
const path = require('path');
var bodyParser = require('body-parser');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('staticDB/writings.json')
const shortid = require('shortid')
const db = low(adapter)
db.defaults({ posts: [], user: {}, count: 0 })
  .write()

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/../views/editor/froala.html'));
});

router.get("/list",function(req,res){
	titles=db.get('posts')
  	.map('title')
  	.value()
  	console.log(titles)
  	res.send(titles)
})
router.post("/edit",function(req,res){
	var title=req.body.title;
	const post = db
	  .get('posts')
	  .find({ title: title })
	  .value()
	  console.log(post)
	  res.send(post);
})
router.post('/save', function(req, res) {	

  var title=req.body.title;
  var markup=req.body.markup;
  exists=db.get('posts').find({ title: title }).value()
  if(!exists){
  	console.log("not existing, creating",title)
  	db.get('posts')
  	.push({id: shortid.generate(), title: title,markup: markup})
  	.write()
  }
  else{
  	console.log("existing, updating", title)
  	db.get('posts')
	  .find({ title: title })
	  .assign({ markup: markup})
	  .write()
	  console.log(markup)
	  res.send(":)");
  }

  console.log(exists,title,markup)

  
});

// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;