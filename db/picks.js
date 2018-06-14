const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PicksSchema = new Schema({
	name: { type: String },
	champion: { type: String },
	mostgoals: { type: String },
	groupAwinner: { type: String },
	groupAsecond: { type: String },
	groupBwinner: { type: String },
	groupBsecond: { type: String },
	groupCwinner: { type: String },
	groupCsecond: { type: String },
	groupDwinner: { type: String },
	groupDsecond: { type: String },
	groupEwinner: { type: String },
	groupEsecond: { type: String },
	groupFwinner: { type: String },
	groupFsecond: { type: String },
	groupGwinner: { type: String },
	groupGsecond: { type: String },
	groupHwinner: { type: String },
	groupHsecond: { type: String }
});



module.exports = mongoose.model('Picks', PicksSchema);
