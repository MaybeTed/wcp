const Picks = require('./db/picks');
const Bracket = require('./db/bracket');

// FILL IN CORRECT WINNERS AFTER GAMES ARE PLAYED
const groupWinners = {
	'A': { 'winner': 'Uruguay', 'second': 'Russia' },
	'B': { 'winner': 'Spain', 'second': 'Portugal' },
	'C': { 'winner': 'France', 'second': 'Denmark' },
	'D': { 'winner': 'Croatia', 'second': 'Argentina' },
	'E': { 'winner': 'Brazil', 'second': 'Switzerland' },
	'F': { 'winner': 'Sweden', 'second': 'Mexico' },
	'G': { 'winner': 'Belgium', 'second': 'England' },
	'H': { 'winner': 'Colombia', 'second': 'Japan' }
};
const bracketWinners = {
	round2A: 'Uruguay',
	round2B: 'France',
	round2C: 'Brazil',
	round2D: 'Belgium',
	round2E: 'Russia',
	round2F: 'Croatia',
	round2G: 'Sweden',
	round2H: 'England',
	round3A: 'France',
	round3B: 'Belgium',
	round3C: 'Croatia',
	round3D: 'England',
	round4A: 'France',
	round4B: 'Croatia',
	champ: 'France',
}
const goalsWinner = 'H Kane';

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
		let search = {};
		if (name) {
			search = { name };
		}
		Picks.find(search).exec(function(err, userPicks) {
			if (err) throw err;
			Bracket.find(search).exec(function(err, bracketPicks) {
				if (err) throw err;
				res.json({ userPicks, groupWinners, bracketPicks, bracketWinners, goalsWinner });
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