var logger = require("../../../Qos/logger");
//File update dependency
var fs = require('fs');

var rootDirectory = "www/";
var basePath = "Uploads/";

function checkDirectory(userName, directory) {  
  try{
  	
  		if (!fs.existsSync(rootDirectory)) {
	     fs.mkdirSync(rootDirectory, 0744);
	   	}

	   	var  firstLevel = rootDirectory + basePath;

  		if (!fs.existsSync(firstLevel)) {
	     fs.mkdirSync(firstLevel, 0744);
	   	}
	   
	   var secondLevel = firstLevel + userName;

	   if (!fs.existsSync(secondLevel)) {
	     fs.mkdirSync(secondLevel, 0744);
	   	}

	   	 var thirdLevel = secondLevel + "/" +directory;
  		
  		 if (!fs.existsSync(thirdLevel)) {
	     fs.mkdirSync(thirdLevel, 0744);
	   	}

  }
  catch(error)
  {
  	console.log(error);
  }

}

module.exports = {

	

	UploadToGallery : function (req, res) {
		try
		{
			var directory = req.headers['directory'];
			var userName = req.params.username; 
			var uploadedImageUrls = []; 
			var hostUrl = req.headers['referer'];
			if (!req.files)
			{
    			return res.status(400).send('No image was uploaded.');
			}
			else
			{
				var uploadDirectory = rootDirectory + basePath + userName + "/" + directory ;
				checkDirectory(userName, directory);
				
				//let theImage = req.files.primaryImage;
				setTimeout(function(){
					for(var file in req.files)
					{
						req.files[file].mv(uploadDirectory + "/"+ req.files[file].name.replace(/\s/g,''), function(err) {
					    	if (err)
					    	{
					      		throw(err);
					    	}
					    	else
					    	{
					    		uploadedImageUrls.push(hostUrl + basePath + userName + "/" + directory + "/"+ req.files[file].name.replace(/\s/g,''));
					    		logger.info(uploadedImageUrls);
					    		return res.status(200).json({ "code": 200, "status": "Files uploaded successfully!!", "files" : uploadedImageUrls});
					    	}
					  	});

					}
					100 });
			}
			
		}
		catch(error)
		{
			logger.error("Error description from error log: " +error);
			res.status(400).json("Error uploading image! " + error);
		}
	}
	
}



