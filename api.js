const Picks = require('./db/picks');

module.exports = function(router) {
	router.post('/submitPicks', (req, res) => {
		const picks = new Picks();
		for (var key in req.body) {
			picks[key] = req.body[key];
		}
		picks.save(function(err) {
			if (err) throw err;
			res.json({ success: true });
		})
	});

	router.get('/participants', (req, res) => {
		Picks.find({}, { _id: 1, name: 1}).exec(function(err, results) {
			res.json(results)
		})
	});

	router.get('/picks', (req, res) => {
		const { name } = req.query;
		Picks.find({ name }).exec(function(err, results) {
			if (err) throw err;
			res.json({ userPicks: results });
		});
	});

	return router;
}