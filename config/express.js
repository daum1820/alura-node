var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function(){
	var app = express();

	app.use(express.static('./app/public'));
	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	app.use(bodyParser.urlencoded({extended : true}));
	app.use(bodyParser.json());
	app.use(expressValidator());

	consign({ cwd : 'app'})
		.include('routes')
		.then('dao')
		.into(app);

	return app;
}