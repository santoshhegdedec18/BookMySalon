var model = require("../dataStructures/offerModel");
var logger = require("../../../Qos/logger");
var offerModel= model.getOfferModel();

module.exports = {

	addOffer : function (req, res) {
		try
		{
			var newOffer = new reviewModel ({
			business_id : req.body.business_id,
			offer_title : req.body.offer_title,
			offer_description : req.body.offer_description,
			start_date: req.body.start_date,
			end_date: req.body.end_date,
			discount: req.body.discount
			});
			newOffer.save(function(err, offer){
				if(!err)
				{
					logger.info("Review created successfully" + offer);
					res.status(200).json(offer);
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
			res.status(400).json("Error Adding offer" + error);
		}
	},

	getBusinessOffers : function (req, res) {
		try
		{
			offerModel.find({'business_id': req.params.business_id},function(err, offers){
				if(!err)
				{
					logger.info(offers);
					res.status(200).json(offers);
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
			res.status(400).json("Error retrieving offers" + error);
		}
	}

	
}



