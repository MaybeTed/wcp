const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BracketSchema = new Schema({
	name: { type: String },
	champ: { type: String },
	round2A: { type: String },
	round2B: { type: String },
	round2C: { type: String },
	round2D: { type: String },
	round2E: { type: String },
	round2F: { type: String },
	round2G: { type: String },
	round2H: { type: String },
	round3A: { type: String },
	round3B: { type: String },
	round3C: { type: String },
	round3D: { type: String },
	round4A: { type: String },
	round4B: { type: String }
});



module.exports = mongoose.model('Bracket', BracketSchema);
