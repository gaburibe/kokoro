var express = require('express');
var router = express.Router();
const fs = require('fs');
var Downloader = require("../local_modules/downloader");
 
var dl = new Downloader();
var i = 0;

	
 
	

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
	dl.getMP3({videoId: "H833o5lnB2E", name: "pets-porno for pyros.mp3"}, function(err,res){
	    i++;
	    if(err)
	        throw err;
	    else{
	        console.log("Song "+ i + " was downloaded: " + res.file);
	    }
	});
});

module.exports = router;