module.exports = function(express, app) {
	require('./websocket')(app);

	var chat = require('./api/chat')(express);
	app.use('/chat', chat);

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

	return app;
};
