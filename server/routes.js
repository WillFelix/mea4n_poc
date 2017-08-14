module.exports = function(express, app, mysql) {
	var socket = require('./websocket')(app);

	app.use(cors);

	var cers = require('./api/cers')(express, mysql, socket);
	app.use('/api/cers', cers);


	app.use(handler404);
	app.use(handlerError);


	function handler404(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	}

	function handlerError(err, req, res, next) {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		// render the error page
		res.status(err.status || 500);
		res.render('error');
	}

	function cors(req, res, next) {
		// Website you wish to allow to connect
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

		// Request methods you wish to allow
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

		// Request headers you wish to allow
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

		// Set to true if you need the website to include cookies in the requests sent
		// to the API (e.g. in case you use sessions)
		res.setHeader('Access-Control-Allow-Credentials', true);

		// Pass to next layer of middleware
		next();
	}

	return app;
};
