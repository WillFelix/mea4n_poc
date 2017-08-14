module.exports = function(express, mysql, socket) {
	var router = express.Router();

	router.get('/billing', function(req, res, next) {
		let query = `
			select sum(op.item_price) as price
			from orders o
			inner join orders_products op on op.orders_id = o.id
			where o.status in ('PAID', 'AVAILABLE', 'MANUALLY_RELEASED');
		`;
		mysql.query(query, function(err, rows, fields) {
			if (err) throw err;
			if (rows) {
				rows = rows[0];
			}

			res.json(rows);
		});
	});

	router.get('/profit-amount', function(req, res, next) {
		let query = `
			select count(op.item_price) as amount
			from orders o
			inner join orders_products op on op.orders_id = o.id
			where o.status in ('PAID', 'AVAILABLE', 'MANUALLY_RELEASED');
		`;
		mysql.query(query, function(err, rows, fields) {
			if (err) throw err;
			if (rows) {
				rows = rows[0];
			}

			res.json(rows);
		});
	});

	router.get("/post", function(req, res) {
		socket.emit("new-buy-client", { price: "10200.58", products: 134 });
		res.json();
	});

	return router;
};
