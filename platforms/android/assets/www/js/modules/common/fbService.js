

//Service containing all operations related to facebook Oauth login
angular.module('CommonApp').service('fbService', function($http, $rootScope) {
 
	// Including facebook login config and FB developer SDK
// Old SDK (deprecated)
//js.src = "//connect.facebook.net/en_US/all.js";

// New SDK (v2.x)
//js.src = "//connect.facebook.net/en_US/sdk.js";
//appId: starlly'855403734599841', watnext - 721577611276328

 window.fbAsyncInit = function() {
    FB.init({
      appId      : Constants.Global.FB_CONFIG.FB_APPID_DEV,
      xfbml      : true,
      version    : Constants.Global.FB_CONFIG.FB_SDKVERSION,
      status     : true
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
 


this.getFBLoginStatus = function(fbCallbackResult){
	 FB.getLoginStatus(function(response) {
	 	return fbCallbackResult(response);
	 }, true);
}

this.fbLogin = function(fbLoginCallback){
	 FB.login(function(fbResponse) {
      FB.api('/me','get', {fields:'name,first_name,last_name,picture,gender,email'}, function(fbResponse) {
      console.log('Good to see you, ' + fbResponse.name + fbResponse.id);
      // console.log(fbResponse.picture.data.url);
      return fbLoginCallback(fbResponse);
 	}, {scope: 'public_profile,email'});
   });
}

this.getfbLoginDetails = function(fbLoginDetailsCallback){
	 FB.api('/me','get', {fields:'name,first_name,last_name,picture,gender,email'}, function(fbResponse) {
       console.log('Good to see you, ' + fbResponse.name + fbResponse.id);
       // console.log(fbResponse.picture.data.url);
       return fbLoginDetailsCallback(fbResponse);
     });
	}

this.logUserOut = function(response){
  FB.logout(function(response) {
  // user is now logged out
    //return response;
  });
}
 
});
