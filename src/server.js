var express = require('express');
var app = express();
var fs = require('fs')

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine
// to ejs

// make express look in the public directory for assets (css/js/img)
app.use(express.static('build'));
app.use(express.static('build/css'));
app.use(express.static('build/img'));

// set the home page route
app.get('/', function(req, res) {
    fs.readFile('build/index.html', 'utf8', function(err, text){
        res.send(text);
    });
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});