var db = require("../dbutils/dbconn.js");
var autoNumber = require('mongoose-auto-number');
module.exports = {
	getUserRatingModel : function (){

		var mongoose = db.openMongooseConn();
		autoNumber.init(mongoose);
		var Schema = mongoose.Schema;
		var ratingSchema = new Schema ({
			_id : {type: Number, autoIncrement: true},
			user_id : {type: Number, ref : 'userModel'},
			business_id : {type: Number, ref : 'BusinessModel'},
			rating : {type: Number},
			rating_date: {type: Date}
			// subscribing   : [{type: Schema.Types.ObjectId, ref: 'BusinessModel' }]
		});
		ratingSchema.plugin(autoNumber.plugin, 'Rating');
		var ratingModel = mongoose.model ('ratingModel', ratingSchema);
		return ratingModel;

	}
}


