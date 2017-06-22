
var scopeHolder ;
//COntroller containing all operations related to login
angular.module('LoginApp').controller('loginCtrl', function($scope, $rootScope,$timeout, $location,$routeParams, fbService, consumeAPIService, sessionStoreService) {

  //Setting the form for sign in OR sign up
   $routeParams.registermode == 'register'? $scope.registerMode=true: $scope.registerMode = false;
   $scope.signUpInfo = {};
  // section included for facebook login......

    $scope.loginFromFB = function(){
     //Call FB service to check if the user is already logged in to FB from the computer (live FB session running or not)
     fbService.getFBLoginStatus(fbCallbackResult);
     //checkUserExistsByName('Santosh Hegde');
    }

    function fbCallbackResult(resp)
    {
      switch(resp.status){
        case 'connected':
          fbService.getfbLoginDetails(fbLoginDetailsCallback);
          break;
        case 'not_authorized':
          alert('User cancelled login or did not fully authorize.');
          break;
        default:
          fbService.fbLogin(fbLoginCallback);
      }
    }

    function fbLoginDetailsCallback(fbLoginDetails)
    {
      if(fbLoginDetails)
      {
         createUserFromFB(fbLoginDetails);
      }
    }

     function fbLoginCallback(fbResponse)
    {
      if(fbResponse)
      {
         createUserFromFB(fbResponse);
      }
    }

    function createUserInformationObject(userInput, loginType)
    {
      var date = new Date();
      var userObject = {};
      switch(loginType)
      {
        case 'FB':
          userObject = {
          first_name : userInput.first_name,
          last_name : userInput.last_name,
          gender : userInput.gender,
          date_joined: date,
          active: true,
          email: userInput.email,
          phone: null,
          married: false,
          spouse_name : null,
          oauth_login_id: userInput.id,
          login_type: 'FB',
          user_pic_url: userInput.picture.data.url,
          password :null,
          left_on: null,
          country: null,
          state: null,
          city: null,
          location: null,
          address: null,
          pin: null,
          lat: null,
          lan: null
        };
        break;
        case 'EMAIL':
          userObject = {
          first_name : userInput.first_name,
          last_name : userInput.last_name,
          gender : userInput.gender,
          date_joined: date,
          active: true,
          email: userInput.email,
          phone: userInput.phone,
          married: false,
          spouse_name : null,
          oauth_login_id: userInput.id,
          login_type: 'EMAIL',
          user_pic_url: null,
          password :userInput.password,
          left_on: null,
          country: null,
          state: null,
          city: null,
          location: null,
          address: null,
          pin: null,
          lat: null,
          lan: null
        };
        break;
        case 'GOOGLE':
        userObject = {
          first_name : userInput.first_name,
          last_name : userInput.last_name,
          gender : null,
          date_joined: date,
          active: true,
          email: userInput.email,
          phone: null,
          married: false,
          spouse_name : null,
          oauth_login_id: userInput.id,
          login_type: 'GOOGLE',
          user_pic_url: userInput.pic_url,
          password :null,
          left_on: null,
          country: null,
          state: null,
          city: null,
          location: null,
          address: null,
          pin: null,
          lat: null,
          lan: null
        };
        break;
      }
      return userObject;
    }

    function createUser(userInput)
    {
      consumeAPIService.httpRequestWithPromise(Constants.URLS.createUser, Constants.Global.METHOD.POST, userInput,Constants.Global.DefaultHTTPHeader, null)
      .then(
        function(resp) { 
            //console.log(resp);
            populateUserInfo(resp);
            
        }, function(resp) { 
          console.log('Error in creating the user!');
        }
      );

    }
    function createUserFromFB(userInput)
    {
      
      var userObject = createUserInformationObject(userInput, 'FB');
      validateAndAddUserByEmail(userObject, 'FB');
    }

    $scope.createUserFromEmail = function(formInput){
      if(formInput.$valid)
      {
        var userObject = createUserInformationObject($scope.signUpInfo, 'EMAIL');
        validateAndAddUserByEmail(userObject, 'EMAIL');
       
        
      }
      else
      {
        alert('Ahh!!! you missed filling some mandatory fields to complete your registration!');
      }
    }
    
     function validateAndAddUserByEmail(signUpInfo, from)
     {
      
      consumeAPIService.httpRequestWithPromise(Constants.URLS.checkUserByEmail.replace('{email}',signUpInfo.email), Constants.Global.METHOD.GET, null,Constants.Global.DefaultHTTPHeader, null)
      .then(
        function(resp) { 
          if(resp.length <1)
          {
            createUser(signUpInfo);
          }
          else
          {
            
            if(from === 'FB'){
               switch(resp[0].login_type) {
                case 'EMAIL':
                    alert('Email Id has already been registered with us! please try logging in using your email Id and password.');
                  break;
                case 'FB':
                    populateUserInfo(resp[0]);
                  break;
                case 'GOOGLE':
                    alert('You have already registered with us through Google! Please use Google option to log in.');
                  break;
                 }
            }
            else if(from === 'GOOGLE'){
                switch(resp[0].login_type) {
                  case 'EMAIL':
                      alert('Email Id has already been registered with us! please try logging in using your email Id and password.');
                    break;
                  case 'FB':
                      alert('You have already registered with us through Facebook! Please use Facebook option to log in.');
                    break;
                  case 'GOOGLE':
                      populateUserInfo(resp[0]);
                    break;
                }
            }
            else{
               switch(resp[0].login_type) {
                case 'EMAIL':
                    alert('Email Id has already been registered with us! please try logging in using your email Id and password.');
                  break;
                case 'FB':
                    alert('You have already registered with us through Facebook! Please use Facebook option to log in.');
                  break;
                case 'GOOGLE':
                    alert('You have already registered with us through Google! Please use Google option to log in.');
                  break;
                }
            }
          }
            
        }, function(resp) { 
          console.log('Error in validatin user by email!');
        }
          
      );

    }
    
    function validateEmailAndPassword(input)
    {
       var updateHeaders = Constants.Global.DefaultHTTPHeader;
        updateHeaders.email = input.email;
        updateHeaders.password = input.password;
        consumeAPIService.httpRequestWithPromise(Constants.URLS.validateLogin, Constants.Global.METHOD.GET, null,updateHeaders, null)
        .then(
        function(resp) { 
          if(resp.length >0)
          {  
             populateUserInfo(resp[0]);
          }
          else
          {
               alert('Invalid User Id OR Password!');
               
          }
        }, function(resp) { 
          alert('Invalid User Id OR Password!');
          console.log('Error in validating user by email!');
        });

    }
    $scope.validateEmailLogin = function(formInput){
      if(formInput.$valid)
      {
         consumeAPIService.httpRequestWithPromise(Constants.URLS.checkUserByEmail.replace('{email}',$scope.signUpInfo.email), Constants.Global.METHOD.GET, null,Constants.Global.DefaultHTTPHeader, null)
        .then(
          function(resp){
            if(resp.length > 0)
            {
              if(resp[0].login_type === 'EMAIL')
              {
                validateEmailAndPassword($scope.signUpInfo);
              }
              else if(resp[0].login_type === 'FB')
              {
                alert('You have registered using Facebook login! you may want to login from Facebook');
              }
              else
              {
                alert('You have registered using Google login! you may want to login from Google.');
              }
            }
            else
            {
              alert('You have not registered yet! please register using the link below.');
            }
          }, function(err){
            console.log('Error in validating user by email!' + err);
          });
       
      }
    }

    $scope.loginFromGoogle = function ()
    {
      // scopeHolder is a javascript variable declared outside the angular module to fetch Google user info from the javscript function 
       var userObject = createUserInformationObject(scopeHolder, 'GOOGLE');
      validateAndAddUserByEmail(userObject, 'GOOGLE');
    }

    function populateUserInfo(userOutput)
    {
       // Store the user details in session userObject
      sessionStoreService.setUserSession(userOutput);
      $rootScope.$broadcast('updateLoginStatus', { status: true, user_name: userOutput.first_name + " "+ userOutput.last_name, user_pic_url :userOutput.user_pic_url });
    }

});
