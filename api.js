const Picks = require('./db/picks');
const Bracket = require('./db/bracket');

// FILL IN CORRECT WINNERS AFTER GAMES ARE PLAYED

// Data for testing
// const groupWinners = {
// 	'A': { 'winner': 'Russia', 'second': 'Uruguay' },
// 	'B': { 'winner': 'Iran', 'second': 'Portugal' },
// 	'C': { 'winner': 'France', 'second': 'Denmark' },
// 	'D': { 'winner': 'Croatia', 'second': 'Iceland' },
// 	'E': { 'winner': 'Serbia', 'second': 'Brazil' },
// 	'F': { 'winner': 'Sweden', 'second': 'Mexico' },
// 	'G': { 'winner': 'Belgium', 'second': 'England' },
// 	'H': { 'winner': 'Poland', 'second': 'Senegal' }
// };
// const bracketWinners = {
// 	round2A: 'Russia',
// 	round2B: 'France',
// 	round2C: 'Mexico',
// 	round2D: 'Belgium',
// 	round2E: 'Uruguay',
// 	round2F: 'Denmark',
// 	round2G: 'Brazil',
// 	round2H: 'England',
// 	round3A: 'Russia',
// 	round3B: 'Belgium',
// 	round3C: 'Uruguay',
// 	round3D: 'Brazil',
// 	round4A: 'Russia',
// 	round4B: 'Brazil',
// 	champ: 'Brazil',
// }
const groupWinners = {
	'A': { 'winner': '---', 'second': '---' },
	'B': { 'winner': '---', 'second': '---' },
	'C': { 'winner': '---', 'second': '---' },
	'D': { 'winner': '---', 'second': '---' },
	'E': { 'winner': '---', 'second': '---' },
	'F': { 'winner': '---', 'second': '---' },
	'G': { 'winner': '---', 'second': '---' },
	'H': { 'winner': '---', 'second': '---' }
};
const bracketWinners = {
	round2A: '',
	round2B: '',
	round2C: '',
	round2D: '',
	round2E: '',
	round2F: '',
	round2G: '',
	round2H: '',
	round3A: '',
	round3B: '',
	round3C: '',
	round3D: '',
	round4A: '',
	round4B: '',
	champ: '',
}
const goalsWinner = '';

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