var db = require("../dbutils/dbconn");
var autoNumber = require('mongoose-auto-number');
var mongoose;
module.exports = {
	getBusinessModel : function (){

		mongoose = db.openMongooseConn();
		autoNumber.init(mongoose);
		var Schema = mongoose.Schema;
		var bizSchema = new Schema ({
			_id : {type: Number, autoIncrement: true},
		   bizName: {type: String},
		   userName:{type: String},
		   password:{type: String},
		   phone: {type: Number},
		   email:{type: String},
		   lat: {type: Number},
		   lng: {type: Number},
		   primary_image_url:{type: String},
		   logo_url: {type: String},
		   biz_type:[Schema.Types.Mixed],
		   address1:{type: String},
		   address2:{type: String},
		   city:{type: String},
		   state:{type: String},
		   pin:{type: Number},	
		   locality:{type: String},
		   contact_person_fname:{type: String},
		   contact_person_lname:{type: String},
		   service_type:{type: String},
		   offered_services:[Schema.Types.Mixed],
		   pictures_gallery_urls: [String],
		   active: {type: Boolean},
		   approved: {type: Boolean},
		   joined_on: {type: Date , default: Date.now},
		   approved_on: {type: Date},
		   left_on: {type: Date},
		   business_hours: [Schema.Types.Mixed],
		   ratings:  [{type: Schema.Types.ObjectId, ref: 'ratingModel' }],
		   reviews:  [{type: Schema.Types.ObjectId, ref: 'reviewModel' }],
		   offers:  [{type: Schema.Types.ObjectId, ref: 'offerModel' }]

		});
		bizSchema.plugin(autoNumber.plugin, 'Business');
		var businessModel = mongoose.model ('BusinessModel', bizSchema);
		
		return businessModel;

	}

}



