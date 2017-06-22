
var model = require("../dataStructures/user-review-Model");
var logger = require("../../../Qos/logger");

var reviewModel= model.getUserReviewModel();

module.exports = {

	addReview : function (req, res) {
		try
		{
			var newReview = new reviewModel ({
			user_id : req.body.user_id,
			business_id : req.body.business_id,
			review_content : req.body.review_content,
			review_date: req.body.review_date
			});
			newReview.save(function(err, review){
				if(!err)
				{
					logger.info("Review created successfully" + review);
					res.status(200).json(review);
				}
				else
				{
					throw(err);
				}
			});
			
		}
		catch(error)
		{
			logger.error("Error description from error log: " +error);
			res.status(400).json("Error Adding Review" + error);
		}
	},

	getReviewsForBusiness : function (req, res) {
		try
		{
			reviewModel
			.find({'business_id': req.params.bizid})
			.populate('user_id')
			.exec(function(err, result){
				if(err) throw(err);
				res.status(200).json(result);
			})
		}
		catch(error)
		{
			logger.error("Error description from error log: " +error);
			console.log(error);
			res.status(400).json("Error retrieving reviews" + error);
		}
	}

	
}



