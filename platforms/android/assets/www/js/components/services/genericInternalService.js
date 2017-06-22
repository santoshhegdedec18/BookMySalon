/*
 * Starlly.
 * 
 * Copyright (c) 2016 ariveguru.com
 * http://ariveguru.com
 *
 * Version 			: 	0.00.01
 * Author			:	Vinay N M
 * Date				:	12-Sept-2016
 */

angular.module('MainApp').service('genericService', function($http, $rootScope, configHttpReqService) {
	this.uploadFileToUrl = function(files, data, uploadType){
		var fd = new FormData();
		for(var file in files){
			fd.append(file, files[file]);
		}
		
		var HOSTNAME = window.location.href.split(/(https?:\/\/[^\/]+)/gi)[1];
		if( window.location.href.indexOf('dev') >= 0 ){
			HOSTNAME = HOSTNAME + '/dev'; }
		else if( window.location.href.indexOf('partner') >= 0){
			HOSTNAME = HOSTNAME + '/partner';
		}

		var uploadUrl = HOSTNAME + "/upload";
		var restid = "defaultFolder";
		if(data) {
			restid = data;
		}
		$http.post(uploadUrl,fd, { transformRequest: angular.identity, headers: {'Content-Type': undefined, 'restid': restid.replace(/ /g, "")} })
		.success(function(resp){
		 	alert("Image(s) uploaded successfully!");
		 	resp.uploadType = uploadType;
		 	$rootScope.$broadcast("uploadedFilePath", resp);
		 	// $('#load').hide();
		}).error(function(){
			console.log("error in image(s) upload!!");
		 	alert("Error in uploading image to StarLLy");
		 	// $('#load').hide();
		});
  	};
});