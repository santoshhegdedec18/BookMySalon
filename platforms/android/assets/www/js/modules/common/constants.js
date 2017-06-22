

var HOSTNAME = "";


var Constants = (function() {


	//configure HOSTNAME using the configuration elements set in js/config/config.js
	
	switch(Config.Env.Environment)
	{
		case "local":
				HOSTNAME = Config.Keys.HostName_Localhost;
				break;

		case "test":
				HOSTNAME = Config.Keys.HostName_Test;
				break;

		case "prod":
				HOSTNAME = Config.Keys.HostName_Prod;
				break;

	}
	

	var Global = (function() {
		function Global() {
			this.DefaultHTTPHeader = { 'Content-type': 'application/json'};
										// 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers',
										// 'Access-Control-Allow-Origin': '*',
										// 'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT',
										// 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization' };
			this.CrossOriginHeader = { 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'};
			this.DATATYPE = "JSON";
			this.titleToShowOnHeader = "Home";
			this.isLoggedIn = false;
			this.restId = "";
			this.METHOD = {
				"POST":"POST",
				"GET":"GET",
				"DELETE":"DELETE",
				"PUT":"PUT"
			};
			this.OFFER_TYPE = {
				"LIVE":"LIVE",
				"EXPIRED":"EXPIRED",
				"DRAFT":"DRAFT",
				"CANCEL":"CANCEL"
			};
			this.FB_CONFIG = {
				"FB_APPID_DEV":"855403734599841",
				"FB_APPID_TEST":"",
				"FB_APPID_PROD":"",
				"FB_SDKVERSION" : "v2.8"
			}; //Added to store FB config details
			this.FROM_AND_TO_TIME = '00:00 00:30 01:00 01:30 02:00 02:30 03:30 04:00 04:30 05:00 05:30 06:00 06:30 07:00 07:30 08:00 08:30 09:00 09:30 10:00 10:30 11:00 11:30 12:00 12:30 13:00 13:30 14:00 14:30 15:00 15:30 16:00 16:30 17:00 17:30 18:00 18:30 19:00 19:30 20:00 20:30 21:00 21:30 22:00 22:30 23:00 23:30 23:59';
			this.OnlyNumbersNChar = "/^[a-zA-Z0-9 ]*$/";
			//Dashboard DateTime
			this.DAYS_BY_WEEKLY = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
			this.MONTHS_BY_YEARLY = ['January','February','March','April','May','June','July ','August','September','October','November','December'],
			this.RestoFeatures = [{
				"name":"Vallet Parking",
				"selected":false,
				"image_url": 'https://storage.googleapis.com/starlly/web/parking.png'
			},
			{
				"name":"Free Wi-fi",
				"selected":false,
				"image_url": 'https://storage.googleapis.com/starlly/web/wifi.png'
			},
			{
				"name":"Serves Wine",
				"selected":false,
				"image_url": 'https://storage.googleapis.com/starlly/web/Serves Wine.png'
			},
			{
				"name":"Smoking",
				"selected":false,
				"image_url": 'https://storage.googleapis.com/starlly/web/Smoking.png'
			},
			{
				"name":"Music",
				"selected":false,
				"image_url": 'https://storage.googleapis.com/starlly/web/music.png'
			},
			{
				"name":"Vegan Food",
				"selected":false,
				"image_url": 'https://storage.googleapis.com/starlly/web/vegan.png'
			},
			{
				"name":"Wheelchair Accessible",
				"selected":false,
				"image_url": 'https://storage.googleapis.com/starlly/web/Wheelchair.png'
			},
			{
				"name":"Self Parking",
				"selected":false,
				"image_url": 'https://storage.googleapis.com/starlly/web/Self Parking.png'
			},
			{
				"name":"Alcohol",
				"selected":false,
				"image_url": 'https://storage.googleapis.com/starlly/web/Serves Alcohol.png'
			},
			{
				"name":"Serves Beer",
				"selected":false,
				"image_url": 'https://storage.googleapis.com/starlly/web/Serves Beer.png'
			},
			{
				"name":"TV",
				"selected":false,
				"image_url": 'https://storage.googleapis.com/starlly/web/TV.png'
			},
			{
				"name":"Gluton/Casein Free Food",
				"selected":false,
				"image_url": 'https://storage.googleapis.com/starlly/web/casien-free.png'
			},
			{
				"name":"Jain Food",
				"selected":false,
				"image_url": 'https://storage.googleapis.com/starlly/web/Jain Food.png'
			}];
			allCuisines = [
				'Multicuisine', 'Afghani', 'African', 'American', 'Andhra', 'Anglo Indian','Arabian', 'Armenian', 'Asian', 'Assamese', 'Australian', 'Awadhi', 'Bakery', 'Bangladeshi', 'Belgian', 'Bengali', 'Beverages', 'Bihari', 'Biryani', 'British', 'Bistro', 'Burger', 'Burmese', 'Cafe', 'Charcoal', 'Grill', 'Chettinad', 'Chili', 'Chinese', 'Coastal Karnataka', 'Continental', 'Coorg', 'Desserts', 'European', 'Fast Food', 'Fijian', 'Finger Food', 'French', 'German', 'Goan', 'Greek', 'Gujarati', 'Healthy Food', 'Hyderabadi', 'Ice Cream', 'Indonesian', 'Indian Chinese', 'Iranian', 'Irish', 'Israeli', 'Italian', 'Japanese', 'Juices', 'Kashmiri', 'Kerala', 'Konkan', 'Korean', 'Kumauni', 'Lebanese', 'Lounge', 'Lucknowi', 'Maharashtrian', 'Malaysian', 'Malwani', 'Mangalorean', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Modern Australian', 'Mongolian', 'Moroccan', 'Mughlai', 'Naga', 'Native Australian', 'Nepalese', 'North Indian', 'North Karnataka', 'Oriya', 'Pakistani', 'Panini', 'Parsi', 'Persian', 'Pizza', 'Punjabi', 'Portuguese', 'Rajasthani', 'Raw Meats', 'Russian', 'Salad', 'Seafood', 'Sindhi', 'Singaporean', 'South American', 'South Indian', 'Spanish', 'Sri Lankan', 'Steakhouse', 'Street Food', 'Sushi', 'Tea', 'Tex-Mex', 'Thai', 'Tibetan', 'Turkish', 'Udupi', 'Vietnamese'
		    ];
		    StarllyAdmin = ['admin']
		}
		return Global;
	})();

    var URLConstants = (function() {
		function URLConstants() {
			//Login
			this.hostName = HOSTNAME;
			this.checkUserByEmail = HOSTNAME + "/getuserbyemail/{email}";
			this.checkByFbId = HOSTNAME + "/getuserbyfbid/{fbid}";
			this.createUser = HOSTNAME + "/createuser";
			this.validateLogin = HOSTNAME + "/validatelogin";
			this.sendResetLink = HOSTNAME + "/sendResetLink/{email}";
			this.resetPassword = HOSTNAME + "/resetpassword";

			
		
		
		}
		return URLConstants;
	})();

	var HttpReqCallback = (function() {
		function HttpReqCallback() {
			this.SIGNUP = "SIGNUPTOSTARLLY";
			this.SIGNIN = "SIGNINTOSTARLLY";
			this.UPDATEINFO = "UPDATEINFOTOSTARLLY";
			this.CREATENEWOFFER = "CREATENEWOFFER";
			this.GETLIVEOEFFER = "GETLIVEOEFFER";
			this.GETDRAFTOEFFER = "GETDRAFTOEFFER";
			this.GETEXPIREDOEFFER = "GETEXPIREDOEFFER";
			this.GETCANCELEDOEFFER = "GETCANCELEDOEFFER";
			this.DELETEPARTICULAROFFER = "DELETEPARTICULAROFFER";
			this.EDITOFFER = "EDITOFFER";
			this.GOLIVEPARTICULAROFFER = "GOLIVEPARTICULAROFFER";
			this.SOCIAL = "SIGNEDINFROMSOCIALSITE"; //added for social network login
		}
		return HttpReqCallback;
    })();
	
	var constants = {
		URLS 			: 	new URLConstants(),
		Global 			: 	new Global(),
		HTTP_REQ		: 	new HttpReqCallback()
	};
    return constants;

})();