

var Config = (function() {


    var Keys = (function() {
		function Keys() {
			//Starlly Admin
			this.HostName_Localhost = "http://localhost:5000";
			this.HostName_Test = "https://starlly.in/dev";
			this.HostName_Prod = "https://starlly.in/partner";

		}
		return Keys;
	})();

	 var Env = (function() {
		function Env() {
			//Starlly Admin environment local/test/prod
			this.Environment = "local";
		}
		return Env;
	})();

	
	var Config = {
		Keys 			: 	new Keys(),
		Env 			:   new Env()
	};
    return Config;

})();