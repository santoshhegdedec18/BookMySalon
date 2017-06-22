var db = require("../dbutils/dbconn.js");
var autoNumber = require('mongoose-auto-number');
module.exports = {
	getUserModel : function (){

		var mongoose = db.openMongooseConn();
		autoNumber.init(mongoose);
		var Schema = mongoose.Schema;
		var userSchema = new Schema ({
			_id : {type: Number, autoIncrement: true},
			first_name : {type: String},
			last_name : {type: String},
			gender : {type: String},
			date_joined: {type: Date, default: Date.now},
			active: {type: Boolean, default: false},
			email: {type: String},
			phone: {type: Number},
			married: {type:Boolean},
			spouse_name : {type: String},
			oauth_login_id: {type: String},
          	login_type: {type : String} ,
			user_pic_url: {type: String},
			password :{type: String},
			left_on: {type: Date},
			country: {type:String},
			state: {type:String},
			city: {type:String},
			location: {type: String},
			address: {type: String},
			pin: {type: Number},
			lat: {type: Number},
			lan: {type:Number},
			ratings:  [{type: Schema.Types.ObjectId, ref: 'ratingModel' }],
		   	reviews:  [{type: Schema.Types.ObjectId, ref: 'reviewModel' }]
		});
		userSchema.plugin(autoNumber.plugin, 'User');
		var userModel = mongoose.model ('userModel', userSchema);
		return userModel;

	}
}


