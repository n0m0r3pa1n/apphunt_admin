var express = require('express')
		, app = express()
		, port = process.env.PORT || 3000
		, router = express.Router();

app.use(express.static('build'));
app.use(express.static('src/css'));
router.get('/', function(req, res, next) {
	res.render('build/index.html');
});

app.use('/', router);

app.listen(port);
console.log('App running on port', port);