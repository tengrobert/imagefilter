var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var busboy = require("connect-busboy");
var fs = require('fs');

const app = express();
const publicPath = express.static(path.join(__dirname, 'public'), { redirect: false });
const indexPath = path.join(__dirname, 'public/index.html');

app.use(publicPath);
app.use(bodyParser.json());
app.get('/', function (_, res) { res.sendFile(indexPath) });

app.use(busboy());
app.put("/upload", function (req, res) {
    req.busboy.on("file", function (fieldName, file, filename) {
        console.log(fieldName, file);
        const newpath = __dirname + '/public/' + filename;
        file.pipe(fs.createWriteStream(newpath));
        res.end();
    });
    req.pipe(req.busboy);
});


var server = app.listen(process.env.PORT || 3010, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`Example app listening at http://%s%s`, host, port);
});