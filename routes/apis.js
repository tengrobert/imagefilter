var express = require('express');
var busboy = require("connect-busboy");
var fs = require('fs');
var router = express.Router();
var path = require('path');

router.use(busboy());
router.put("/upload", function(req, res){	
	req.busboy.on("file", function(fieldName, file, filename){
        console.log(fieldName, file);
		res.end();
	});	
	req.pipe(req.busboy);
});

module.exports = router;