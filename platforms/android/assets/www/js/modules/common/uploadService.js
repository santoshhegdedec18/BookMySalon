

//Service containing all operations related to image upload
angular.module('CommonApp').service('uploadService', function($http, $q, $rootScope) {
 
	return ({
      uploadImages: uploadImages
    });
    var imageUploadedURL = '';
    var imgtype = '';
    function uploadImages(file, restid, imageType) {
    imgtype = imageType;
		var HOSTNAME = "http://localhost:9000";

		var uploadUrl = HOSTNAME + "/upload"  ;
    imageUploadedURL = HOSTNAME + "/uploaded/" + restid + "/"+ file.name ;
      	var upl = $http({
        method: 'POST',
        url: uploadUrl, // /api/upload
        headers: {
          'Content-Type': undefined,
           'restid': restid.replace(/ /g, "")
        },
        data: {
          files: file
        },
        transformRequest: function(data, headersGetter) {
          var formData = new FormData();
          angular.forEach(data, function(value, key) {
            formData.append(key, value);
          });

          var headers = headersGetter();
          delete headers['Content-Type'];

          return formData;
        }
      });
      return upl.then(handleSuccess, handleError);

    } // End upload function

     function handleError(response, data) {
      if (!angular.isObject(response.data) ||!response.data.message) {
        return ($q.reject('Oops! failed uploading the image.'));
      }

      return ($q.reject(response.data.message));
    }

    function handleSuccess(response) {
      $rootScope.$broadcast('updateImageURL', { url: imageUploadedURL, type: imgtype });
       return (response);
    }

 
});
