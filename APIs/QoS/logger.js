var winston = require('winston');
const fs = require('fs');
const logDir = 'logs';
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

function dbDateFormate(date) {
   return date.getFullYear() 
   			+ "-" + (date.getMonth() + 1) 
   			+ "-" + date.getDate() 
   			+ " " + date.getHours() 
   			+ ":" + date.getMinutes() 
   			+ ":" + date.getSeconds();
}

var logger = new (winston.Logger)({
	transports: [
	   new (winston.transports.File)({
	   	  filename: `${logDir}/app.log`,

	      json: false,

	      timestamp: () => {
	        return dbDateFormate(new Date());
	      },
	      
	      formatter: (options) => {
	      	return options.timestamp() 
	        +' '+ options.level.toUpperCase() 
	        +' '+ (options.message ? options.message : '') 
	        + (options.meta && Object.keys(options.meta).length ? '\n'
	        + JSON.stringify(options.meta) : '' );
	      }
	  })
  	]
});

logger.level = 'debug';

module.exports = logger;
