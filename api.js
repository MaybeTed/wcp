const Picks = require('./db/picks');

// FILL IN CORRECT WINNERS AFTER GAMES ARE PLAYED
// const groupWinners = {
// 	'A': { 'winner': 'Egypt', 'second': 'Russia' },
// 	'B': { 'winner': 'Spain', 'second': 'Morocco' },
// 	'C': { 'winner': 'Denmark', 'second': 'Australia' },
// 	'D': { 'winner': 'Croatia', 'second': 'Iceland' },
// 	'E': { 'winner': 'Brazil', 'second': 'Costa Rica' },
// 	'F': { 'winner': 'Germany', 'second': 'Mexico' },
// 	'G': { 'winner': 'Belgium', 'second': 'England' },
// 	'H': { 'winner': 'Japan', 'second': 'Colombia' }
// };
const groupWinners = {};

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
			res.json({ userPicks: results, groupWinners });
		});
	});

	return router;
}