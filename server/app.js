module.exports = function(port) {
	var path = require('path');
	var logger = require('morgan');
	var favicon = require('serve-favicon');
	var bodyParser = require('body-parser');

	var express = require('express');
	var app = express();

	app.set('port', port);

	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({'extended':'false'}));
	app.use(express.static(path.join(__dirname, 'dist')));

	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'cers'
	});

	connection.connect();

	require('./routes.js')(express, app, connection);

	return app;
};
