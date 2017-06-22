
var mongoose=require('mongoose');

module.exports = {
	openMongooseConn : function(){
		if(mongoose.connection.readyState <1)
		{
			mongoose.connect ('mongodb://localhost:27017/dbParlours');
			mongoose.connection.on('open', function(){
				console.log('Mongoose connected.' + mongoose.connection.readyState);
			});
		}


		// If the connection throws an error
	mongoose.connection.on('error',function (err) {  
	  console.log('Mongoose default connection error: ' + err);
	}); 

	// When the connection is disconnected
	mongoose.connection.on('disconnected', function () {  
	  console.log('Mongoose default connection disconnected'); 
	});
			// If the Node process ends, close the Mongoose connection 
	process.on('SIGINT', function() {  
	  mongoose.connection.close(function () { 
	    console.log('Mongoose default connection disconnected through app termination'); 
	    process.exit(0); 
	  }); 
	}); 

		return mongoose;

	},

	closeConnection : function(){
		mongoose.disconnect();
	}

}



