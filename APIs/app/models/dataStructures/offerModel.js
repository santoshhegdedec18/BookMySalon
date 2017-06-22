var db = require("../dbutils/dbconn.js");
var autoNumber = require('mongoose-auto-number');
module.exports = {
	getOfferModel : function (){

		var mongoose = db.openMongooseConn();
		autoNumber.init(mongoose);
		var Schema = mongoose.Schema;
		var offerSchema = new Schema ({
			_id : {type: Number, autoIncrement: true},
			business_id : {type: Number,  ref : 'BusinessModel'},
			offer_title : {type: String},
			offer_description : {type: String},
			start_date: {type: Date},
			end_date: {type: Date},
			discount: {type: Number}
			
		});
		offerSchema.plugin(autoNumber.plugin, 'Offer');
		var offerModel = mongoose.model ('offerModel', offerSchema);
		return offerModel;

	}
}


