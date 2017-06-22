var model = require("../dataStructures/user-rating-Model");
var logger = require("../../../Qos/logger");
var ratingModel= model.getUserRatingModel();

module.exports = {

	addRating : function (req, res) {
		try
		{
			var newRating = new ratingModel ({
				business_id : req.body.business_id,
				user_id :  req.body.user_id,
				rating : req.body.rating,
				review_date: req.body.rating_date
			});
			var query = {'business_id': req.body.business_id, 'user_id':  req.body.user_id};
			ratingModel.findOneAndUpdate(query, newRating, {upsert:true}, function(err, rating){
			    if (err) throw(err);
			    res.status(200).json(rating);
			});
			
		}
		catch(error)
		{
			logger.error("Error description from error log: " +error);
			res.status(400).json("Error Adding Rating" + error);
		}
	},

	getRatingsForBusiness : function (req, res) {
		try
		{
			var bizId = req.params.bizid;
			ratingModel.aggregate([
						 {$match: ratingModel.where({'business_id': bizId}).cast(ratingModel)},
						{$group: {
							_id: '$business_id',
							avgRating: {$avg: '$rating'}}}
						
						], function(err, result){
							// console.log(result);
							res.status(200).json(result);
						});

			
		}
		catch(error)
		{
			logger.error("Error description from error log: " +error);
			res.status(400).json("Error retrieving reviews" + error);
		}
	}

	
}



