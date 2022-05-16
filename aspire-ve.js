(function(){
"use strict";
'use strict';

// Rewritten for Primo VE. TG. 10/12/2020
// Rewrite for Angular 1.6.  Tim Graves.  16/06/2017

var app = angular.module('viewCustom', ['angularLoad'])

// Whitelisting
.constant('AspireTrustBaseUrl', "https://sussex.rl.talis.com/").config(['$sceDelegateProvider', 'AspireTrustBaseUrl', function ($sceDelegateProvider, AspireTrustBaseUrl) {
  var urlWhitelist = $sceDelegateProvider.resourceUrlWhitelist();
  urlWhitelist.push(AspireTrustBaseUrl + '**');
  $sceDelegateProvider.resourceUrlWhitelist(urlWhitelist);
}]);

// End of whitelisting
  
       app.component('prmServiceDetailsAfter', {
	   bindings: { parentCtrl: '<' },
	   controller: 'DisplayAspireListsController',
	   template: '<div ng-show="listsFound != null"><span class="bold text">Cited on reading lists:</span><ul><li ng-repeat="(url,listname) in listsFound"><a href="{{url}}">{{listname}} </a></li></ul></div>'
	   				
					   
	   });
 
 
app.controller('DisplayAspireListsController', function ($scope, $http) {
	
	var vm = this;

	// Declare a global variable to hold the MMSID when it comes from the function
	var theMMSID = vm.parentCtrl.item.pnx.display.mms[0];

var url = 'https://sussex.rl.talis.com/lcn/' + theMMSID + '/lists.json';


// Make the call to Aspire

$http.jsonp(url,{jsonpCallbackParam: 'cb'})

.then(function handleSuccess(response) {

 $scope.listsFound = response.data;
	
	});


});