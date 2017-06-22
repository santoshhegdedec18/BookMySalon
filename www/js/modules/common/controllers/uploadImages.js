angular.module('CommonApp').controller('uploadImageCtrl', ['$scope', '$http', '$rootScope', 'uploadService', 
	function($scope, $http, $rootScope, uploadService) {
		$scope.uploadPrimaryImage = function(){
		       
		      var uploadDirectory = "Primary";
		      if($scope.signup.userName)
		      {
		      	var userName = $scope.signup.userName;
		      }
		      else
		      {
		      	alert('Please enter a valid user credential to proceed uploading images!');
		      	return;
		      }

			  if($scope.myFile)
			  {
			  
			      uploadService.uploadImages($scope.myFile, userName, uploadDirectory);
			  }
			  else
			  {
			  	alert('Please select a Primary image file to be uploaded.');
			  	return;
			  }
		      
				
		}

		$scope.uploadLogoImage = function(){
		      
		      var uploadDirectory = "Logo";
		      if($scope.signup.userName)
		      {
		      	var userName = $scope.signup.userName;
		      }
		      else
		      {
		      	alert('Please enter a valid user credential to proceed uploading images!');
		      	return;
		      }


			  if($scope.logoFile)
			  {
			  
			      uploadService.uploadImages($scope.logoFile, userName, uploadDirectory);
			  }
			  else
			  {
			  	alert('Please select a Logo file to be uploaded.');
			  	return;
			  }
		      
				
		}
	    

		$scope.deleteImage = function(fileUrl, restoProfile, type){
			if(fileUrl) {
				if(restoProfile.name) {
					uploadService.deleteImage(fileUrl, restoProfile, type).then(function(res) {
						var $parentScope = $scope.$parent ? ($scope.$parent.$parent ? $scope.$parent.$parent : undefined) : undefined;
		   				if ($parentScope) {
		   					var data = { uploadType: "SECONDARY", files: [fileUrl] };
		   					$rootScope.$broadcast("deleteSecondaryFilePath", data);
		   					$parentScope.resetProfileChanges();
		   				}	
					});	
				}else{
					var data = {
						uploadType: type,
						files: []
					}
					alert("An error occured while deleting the image!");
				}
			} else {
				alert("An error occured while deleting the image!");
			}
	    };

		$scope.deleteAdditionalImage = function(event, restoProfile, type) {
		   	var $target = $(event.target);
	        var imageUrl  = $target.closest(".s_pic").find(".s_img").attr("src");   
	        var imageName = imageUrl.substr(imageUrl.lastIndexOf("/")+1);
	        $scope.deleteImage(imageUrl, restoProfile, type);       
	    }
	

	}
]);