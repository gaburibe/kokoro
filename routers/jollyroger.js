var express = require('express');
var router = express.Router();
const fs = require('fs');
const ytdl = require('ytdl-core');

	
 
	

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send(':D');
});
// define the about route
router.get('/steal', function(req, res) {
	ytdl('https://www.youtube.com/watch?v=oGmqDLJekBE', 
		{filter: 'audioonly'}).pipe(fs.createWriteStream('audio/icantalk.mp3'));
  // res.send('About birds');
});

module.exports = router;