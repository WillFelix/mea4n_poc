module.exports = function(express, mysql, socket) {
	var router = express.Router();

	router.get('/billing', function(req, res, next) {
		let query = `
			select sum(op.item_price) as price
			from orders o
			inner join orders_products op on op.orders_id = o.id
			where o.status in ('PAID', 'AVAILABLE') and YEAR(o.created_at) = YEAR(now());
		`;
		mysql.query(query, function(err, rows, fields) {
			if (err) throw err;
			if (rows) {
				rows = rows[0];
			}

			res.json(rows);
		});
	});

	router.get('/profit', function(req, res, next) {
		let query = `
			SELECT
			COUNT(CASE WHEN status in ('PAID', 'AVAILABLE') THEN op.item_price ELSE 0 END) AS count_paid,
			SUM(CASE WHEN status in ('PAID', 'AVAILABLE') THEN op.item_price ELSE 0 END) AS paid,

			COUNT(CASE WHEN status = 'WAITING_PAYMENT' THEN op.item_price ELSE 0 END) AS count_waiting,
			SUM(CASE WHEN status = 'WAITING_PAYMENT' THEN op.item_price ELSE 0 END) AS waiting,

			COUNT(CASE WHEN status = 'CANCELLED' THEN op.item_price ELSE 0 END) AS count_cancelled,
			SUM(CASE WHEN status = 'CANCELLED' THEN op.item_price ELSE 0 END) AS cancelled
			FROM orders o
			inner join orders_products op on op.orders_id = o.id
			WHERE YEAR(o.created_at) = YEAR(now());
		`;
		mysql.query(query, function(err, rows, fields) {
			if (err) throw err;
			if (rows) {
				rows = rows[0];
			}

			res.json(rows);
		});
	});

	router.get('/profit-per-month', function(req, res, next) {
		let query = `
		SELECT
			MONTH(o.created_at) - 1 as month,
			count(*) as count_total,
			COUNT(CASE WHEN status in ('PAID', 'AVAILABLE') THEN o.id END) AS count_paid,
			COUNT(CASE WHEN status = 'WAITING_PAYMENT' THEN o.id END) AS count_waiting,
			COUNT(CASE WHEN status = 'CANCELLED' THEN o.id END) AS count_cancelled,

			SUM(o.id) as total,
			SUM(CASE WHEN status in ('PAID', 'AVAILABLE') THEN op.item_price END) AS paid,
			SUM(CASE WHEN status = 'WAITING_PAYMENT' THEN op.item_price END) AS waiting,
			SUM(CASE WHEN status = 'CANCELLED' THEN op.item_price END) AS cancelled
		FROM
			orders o
			inner join orders_products op on op.orders_id = o.id
		WHERE
			YEAR(created_at) = YEAR(now())
		GROUP BY
			MONTH(created_at);
		`;
		mysql.query(query, function(err, rows, fields) {
			if (err) throw err;

			res.json(rows);
		});
	});

	router.get("/post", function(req, res) {
		socket.emit("new-buy-client", { price: "10200.58", products: 134 });
		res.json();
	});

	return router;
};
