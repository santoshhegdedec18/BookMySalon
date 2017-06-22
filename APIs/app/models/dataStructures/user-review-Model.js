var db = require("../dbutils/dbconn.js");
var autoNumber = require('mongoose-auto-number');
module.exports = {
	getUserReviewModel : function (){

		var mongoose = db.openMongooseConn();
		autoNumber.init(mongoose);
		var Schema = mongoose.Schema;
		var reviewSchema = new Schema ({
			_id : {type: Number, autoIncrement: true},
			user_id : {type: Number, ref : 'userModel'},
			business_id : {type: Number, ref : 'BusinessModel'},
			review_content : {type: String},
			review_date: {type: Date},
			user:  {type: Schema.Types.ObjectId, ref: 'userModel' }
		});
		reviewSchema.plugin(autoNumber.plugin, 'Review');
		var reviewModel = mongoose.model ('reviewmodel', reviewSchema);
		return reviewModel;

	}
}


