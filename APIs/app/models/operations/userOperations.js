var db = require("../dbutils/dbconn.js");
var userModel = require("../dataStructures/userModel");
var mailer = require("../mailer/email.js");
var logger = require("../../../Qos/logger");
var usrModel= userModel.getUserModel();

module.exports = {

	createUser : function (req, res){
		try{
			
			var newUser = new usrModel ({
				first_name : req.body.first_name,
		        last_name : req.body.last_name,
		        gender : req.body.gender,
		        date_joined: req.body.date_joined,
		        active: req.body.active,
		        email: req.body.email,
		        phone: req.body.phone,
		        married: req.body.married,
		        spouse_name : req.body.spouse_name ,
		        oauth_login_id: req.body.oauth_login_id,
		        login_type: req.body.login_type,
		        user_pic_url: req.body.user_pic_url,
		        password :req.body.password,
		        left_on: req.body.left_on,
		        country: req.body.country,
		        state: req.body.state,
		        city: req.body.city,
		        location: req.body.location,
		        address: req.body.address,
		        pin: req.body.pin,
		        lat: req.body.lat,
		        lan: req.body.lan
			});

			newUser.save(function(err, user){
				if(!err)
				{
					//db.closeConnection();
					logger.info("User created successfully" + user);

					res.status(200).json(user);
				}
				else
				{
					throw(err);
				}
			});
		}
		catch (error)
		{
			logger.error("Error description from error log: " +error);
			res.status(400).json("Error creating user" + error);
		}
		
	},
	getAllUsers : function (req, res){
		try{
			
			usrModel.find({},function(err, users){
				if(!err)
				{
					//db.closeConnection();
					logger.info(users);
					res.status(200).json(users);
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

			res.status(400).json("Error retrieving all users" + error);
		}
	},

	getUserByEmailId : function (req, res){
		try{
			
			usrModel.find({'email': req.params.email},function(err, users){
				if(!err)
				{
					//db.closeConnection();
					logger.info (users);
					res.status(200).json(users);
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
			res.status(400).json("Error retrieving user by email id." + error);
		}
	},

	validateUserLoginByEmailPassword : function (req, res){
		try{
			
			var email = req.headers['email'];
			var password = req.headers['password'];
			usrModel.find({'email': email , 'password': password},function(err, users){
				if(!err)
				{
					//db.closeConnection();
					if(users.length >0)
					{
						res.status(200).json(users);
					}
					else
					{
						res.status(400).json("User does not exist!");
					}
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
			res.status(400).json("Error validating the validateUserLoginByEmailPassword. " + error);
		}
	},

	sendResetLink : function(req,res){
		try{
			
			var emailDetails = {
				to : req.params.email,
				subject : 'Reset your account password',
				body : ''
			};
			mailer.sendEmail(emailDetails, req);
			res.status(200).json("Email has ben sent.");
		}
		catch(error)
		{
			logger.error("Error description from error log: " +error);
			res.status(400).json("Error Sending reset link. " + error);
		}
	},

	resetPassword : function(req, res){
		try
		{
			
			usrModel.findOneAndUpdate({'email': req.body.email }, { 'password' : req.body.password }, function(err, user) {
			  if (err) throw err;

			  // we have the updated user returned to us
			  //db.closeConnection();
			  console.log(user);
			  res.status(200).json("Password successfully updated!");
			});
		}
		catch(error)
		{
			logger.error("Error description from error log: " +error);
			res.status(400).json("Error resetting password. " + error);
		}
	}

}



