module.exports = function(app) {
	var server = require('http').createServer(app);
	var io = require('socket.io')(server);

	server.listen(4000);

	io.on('connection', function (socket) {

	    socket.on('new-buy-server', function (data) {
	        io.emit('new-buy-client', { price: data });
	    });

	});

	return io;
};