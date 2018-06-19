const Picks = require('./db/picks');
const Bracket = require('./db/bracket');

// FILL IN CORRECT WINNERS AFTER GAMES ARE PLAYED
const groupWinners = {
	'A': { 'winner': 'Russia', 'second': 'Uruguay' },
	'B': { 'winner': 'Iran', 'second': 'Portugal' },
	'C': { 'winner': 'France', 'second': 'Denmark' },
	'D': { 'winner': 'Croatia', 'second': 'Iceland' },
	'E': { 'winner': 'Serbia', 'second': 'Brazil' },
	'F': { 'winner': 'Sweden', 'second': 'Mexico' },
	'G': { 'winner': 'Belgium', 'second': 'England' },
	'H': { 'winner': 'Poland', 'second': 'Senegal' }
};
const bracketWinners = {
	round2A: 'Russia',
	round2B: 'France',
	round2C: 'Mexico',
	round2D: 'Belgium',
	round2E: 'Uruguay',
	round2F: 'Denmark',
	round2G: 'Brazil',
	round2H: 'England',
	round3A: '',
	round3B: '',
	round3C: '',
	round3D: '',
	round4A: '',
	round4B: '',
	champ: '',
}

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
			res.json({ results, groupWinners })
		})
	});

	router.get('/picks', (req, res) => {
		const { name } = req.query;
		Picks.find({ name }).exec(function(err, userPicks) {
			if (err) throw err;
			Bracket.find({ name }).exec(function(err, bracketPicks) {
				if (err) throw err;
				res.json({ userPicks, groupWinners, bracketPicks, bracketWinners });
			})
		});
	});

	router.post('/submitBracket', (req, res) => {
		const bracket = new Bracket();
		for (var key in req.body) {
			bracket[key] = req.body[key];
		}
		bracket.save(function(err) {
			if (err) throw err;
			res.json({ success: true });
		})
	});

	return router;
}