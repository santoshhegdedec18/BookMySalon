var db = require("../dbutils/dbconn.js");
var businessModel = require("../dataStructures/businessModel");
var mailer = require("../mailer/email.js");
var logger = require("../../../Qos/logger");
var bizModel= businessModel.getBusinessModel();

module.exports = {

	createBusiness : function (req, res) {
		try
		{
			
			var newBusiness = new bizModel ({
			   bizName: req.body.bizName,
			   userName:req.body.userName,
			   password:req.body.password,
			   phone: req.body.phone,
			   email:req.body.email,
			   lat: req.body.lat,
			   lng: req.body.lng,
			   primary_image_url:req.body.primary_image_url,
			   logo_url: req.body.logo_url,
			   biz_type:req.body.biz_type,
			   address1:req.body.address1,
			   address2:req.body.address2,
			   city:req.body.city,
			   state:req.body.state,
			   pin:req.body.pin,	
			   locality:req.body.locality,
			   contact_person_fname:req.body.contact_person_fname,
			   contact_person_lname:req.body.contact_person_lname,
			   service_type:req.body.service_type,
			   offered_services:req.body.offered_services,
			   pictures_gallery_urls: req.body.pictures_gallery_urls,
			   active: req.body.active,
			   approved: req.body.approved,
			   joined_on: req.body.joined_on,
			   approved_on: req.body.approved_on,
			   left_on: req.body.left_on,
			   business_hours: req.body.business_hours
			});

			newBusiness.save(function(err, user){
				if(!err)
				{
					logger.info("Business created successfully" + user);
					//db.closeConnection();
					res.status(200).json(user);
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
			res.status(400).json("Error creating business" + error);
		}
	},

	getBusinessByUserId : function (req, res){
		try{
			
			bizModel.find({'userName': { $regex : new RegExp(req.params.username, "i") }},function(err, user){
				if(!err)
				{
					logger.info (user);
					res.status(200).json(user);
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
			res.status(400).json("Error retrieving business user by User id." + error);
		}
	},

	getAllBusiness : function (req, res){
		try{
			
			bizModel.aggregate([
				// {$match: bizModel.where({approved : 'true'}).cast(bizModel)}, // This line has to be enables later
				{ $lookup:
			     {
			       from: "ratingmodels",
			       localField: "_id",
			       foreignField: "business_id",
			       as: "rating_doc"
			     }
				}
				], function(err, result){
					res.status(200).json(result);
				});

		}
		catch(error)
		{
			logger.error("Error description from error log: " +error);
			res.status(400).json("Error retrieving all business" + error);
		}
	},

	//Temporary method to add some urls to gallery...............
	addGalleryPictures : function(req, res){
		try
		{
			var urls = [ 
				'http://localhost:5000/Uploads/Naturals/Primary/naturals_1.jpg',
				'http://localhost:5000/Uploads/Naturals/Primary/naturals_2.jpg',
				'http://localhost:5000/Uploads/Naturals/Primary/naturals_3.jpg',
				'http://localhost:5000/Uploads/Naturals/Primary/naturals_4.jpg',
				'http://localhost:5000/Uploads/Naturals/Primary/naturals_5.jpg',
				'http://localhost:5000/Uploads/Naturals/Primary/naturals_6.jpg',
				'http://localhost:5000/Uploads/Naturals/Primary/naturals_7.jpg',
				'http://localhost:5000/Uploads/Naturals/Primary/naturals_8.jpg'
			];

			bizModel.findOneAndUpdate({"_id": 7},{ "pictures_gallery_urls" :urls }, function(err, user) {
			  if (err) throw err;

			  // we have the updated user returned to us
			  //db.closeConnection();
			  // user.pictures_gallery_urls = urls;
			  // user.save(); 
			  console.log(user);
			  res.status(200).json("Gallery pictures added successfully!");
			});
		}
		catch(error)
		{
			logger.error("Error description from error log: " +error);
			res.status(400).json("Error Gallery pictures added successfully. " + error);
		}
	}

	
}



