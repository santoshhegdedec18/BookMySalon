//Dependency Models
var logger = require("../Qos/logger");
var listOfBusiness = require(__dirname + "/models/listOfBusiness.js");
var businessOps = require(__dirname + "/models/operations/businessOperations.js");
var fileUpload = require(__dirname + "/models/fileUpload/fileUpload.js");
var userOps = require(__dirname + "/models/operations/userOperations.js");
var userRatings = require(__dirname + "/models/operations/userRatings.js");
var userReviews = require(__dirname + "/models/operations/userReviews.js");

module.exports = function(app) {
    //************CORS issue specific  ********************/
    app.all('/', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
    //************ User sign in related ********************/

    app.post('/createuser',function(req,res){
        try {
            userOps.createUser(req,res);
        } catch (err) {
           logger.error(err.message);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                "errorMessage": err.message
            }));
        }    
    })

    app.get('/getallusers',function(req,res){
        try {
            userOps.getAllUsers(req,res);
        } catch (err) {
           logger.error(err.message);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                "errorMessage": err.message
            }));
        }    
    })

    app.get('/getuserbyemail/:email',function(req,res){
        try {
            userOps.getUserByEmailId(req,res);
        } catch (err) {
           logger.error(err.message);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                "errorMessage": err.message
            }));
        }    
    })

    app.get('/validatelogin',function(req,res){
        try {
            userOps.validateUserLoginByEmailPassword(req,res);
        } catch (err) {
           logger.error(err.message);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                "errorMessage": err.message
            }));
        }    
    })

    app.get('/sendResetLink/:email',function(req,res){
        try {
            userOps.sendResetLink(req,res);
        } catch (err) {
           logger.error(err.message);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                "errorMessage": err.message
            }));
        }    
    })

     app.put('/resetpassword',function(req,res){
        try {
            userOps.resetPassword(req,res);
        } catch (err) {
           logger.error(err.message);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                "errorMessage": err.message
            }));
        }    
    })
 //************ End User sign in related ********************/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//************ Business sign in related ********************/
  app.post('/createbusiness',function(req,res){
        try {
            businessOps.createBusiness(req,res);
        } catch (err) {
            logger.error(err.message);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                "errorMessage": err.message
            }));
        }    
    })

   app.get('/validate/business/:username',function(req,res){
        try {
            businessOps.getBusinessByUserId(req,res);
        } catch (err) {
           logger.error(err.message);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                "errorMessage": err.message
            }));
        }    
    })

    app.get('/allbusiness',function(req,res){
        try {
            businessOps.getAllBusiness(req,res);
        } catch (err) {
           logger.error(err.message);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                "errorMessage": err.message
            }));
        }    
    })
//************ End Business sign in related ********************/
//************ Image upload related ********************/
 app.post('/uploadimages/:username',function(req,res){
        try {
            
            fileUpload.UploadToGallery(req,res);
        } catch (err) {
            logger.error(err.message);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                "errorMessage": err.message
            }));
        }    
    })
 app.post('/addGalleryPictures',function(req,res){
        try {
            
            businessOps.addGalleryPictures(req,res);
        } catch (err) {
            logger.error(err.message);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                "errorMessage": err.message
            }));
        }    
    })
//************ End Image upload related ********************/

//************ Start Rating Related ********************/
 app.post('/addRating',function(req,res){
        try {
            
            userRatings.addRating(req,res);
        } catch (err) {
            logger.error(err.message);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                "errorMessage": err.message
            }));
        }    
    })
  app.get('/getBusinessRating/:bizid',function(req,res){
        try {
            
            userRatings.getRatingsForBusiness(req,res);
        } catch (err) {
            logger.error(err.message);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                "errorMessage": err.message
            }));
        }    
    })
//************ End Rating Related ********************/
//************ Start Review Related ********************/
app.post('/addReview',function(req,res){
        try {
            
            userReviews.addReview(req,res);
        } catch (err) {
            logger.error(err.message);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                "errorMessage": err.message
            }));
        }    
    })
app.get('/getBusinessReviews/:bizid',function(req,res){
        try {
            
            userReviews.getReviewsForBusiness(req,res);
        } catch (err) {
            logger.error(err.message);
            res.writeHead(500, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                "errorMessage": err.message
            }));
        }    
    })
//************ End Review Related ********************/
};
