

//Service containing all operations related to image upload
angular.module('UploadImageApp').service('uploadService',['$http', '$rootScope',  '$q', function($http, $rootScope, $q) {
 
    
    var imageType;
    this.uploadImages = function(files, userName, uploadDirectory) {
      imageType = uploadDirectory;
      var fd = new FormData();
      for(var file in files){
        fd.append(file, files[file]);
      }
  		var HOSTNAME = window.location.href.split(/(https?:\/\/[^\/]+)/gi)[1];
      var uplResult = $http.post(Constants.URLS.UploadImages.replace('{username}',userName),  // forming the url to access nodejs api to pass on the image object to be uploaded
                  fd, 
                  {transformRequest: angular.identity,
                    headers: {'Content-Type': undefined, 'directory': uploadDirectory }
            })

            return uplResult.then(handleSuccess, handleError);

		}

    function handleError(response) {
      return ('Oops! failed uploading the image.' + response);
    }

    function handleSuccess(response) {
      if(imageType == "Logo")
      {
        $rootScope.$broadcast('updateLogoImageModel', response);
      }
      else
      {
        $rootScope.$broadcast('updatePrimaryImageModel', response);
      }
       return (response);
    }


}]);
