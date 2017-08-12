module.exports = function(express) {
	var router = express.Router();

	/* GET ALL CHATS */
	router.get('/:room', function(req, res, next) {
		res.json({ room: req.params.room });
	});

	/* GET SINGLE CHAT BY ID */
	router.get('/:id', function(req, res, next) {
		res.json({ id: req.params.id });
	});

	/* SAVE CHAT */
	router.post('/', function(req, res, next) {
		res.json({ room: "CREATED" });
	});

	/* UPDATE CHAT */
	router.put('/:id', function(req, res, next) {
		res.json({ room: "UPDATED" });
	});

	/* DELETE CHAT */
	router.delete('/:id', function(req, res, next) {
		res.json({ room: "DELETED" });
	});

	return router;
};
