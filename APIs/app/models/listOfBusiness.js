

function AllBusiness(req, response){

    var MongoClient = require('mongodb').MongoClient;
    var connectionURL = 'mongodb://localhost:27017/myproject',
    samplaCollection = 'chapters';

    var chapters = [ {
        'Title': 'Snow Crash',
        'Author': 'Neil Stephenson'
    },
    {
        'Title': 'Snow Crash',
        'Author': 'Neil Stephenson'
    }];
    MongoClient.connect (connectionURL, function(err, db){
        console.log("COnnected to db server");
        var collection = db.collection(samplaCollection);
        collection.insert(chapters, function(error, result) {
            if(!error)
            {
                console.log("Success : " + result.ops.length +"  CHapetrs inserted.");
                response.status(200).json("CHapetrs inserted.");
            }
            else
            {
                console.log("Error while inserting chapters!");
                response.status(400).json("Error while inserting chapters!");
            }
            db.close();
        });
    });

   // response.status(200).json("Hello , here you go");
}

module.exports = {

    getAllBusiness: function(req, response) {
        AllBusiness(req, response);
    }

    
}
