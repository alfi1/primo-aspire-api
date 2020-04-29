
// Rewrite for Angular 1.6.  Tim Graves.  16/06/2017
// This version:
// Addresses the Trust issue by whitelisting the Talis url
// Changes the format in which a callback is declared
// Replaces the deprecated .success function

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
	
	// Loop through all the LCNs in the record to check for the MMSID
	function processLCNS(item, index) {
		
		// Does it match the format for a Sussex MMSID?
		var mmsidCheck = /^99\d*2461$/;
		
		if (mmsidCheck.test(item) == true){
			///console.log(item + " matched an MMSID");
			theMMSID = item;
		}	
	 
	}

	// Declare a global variable to hold the MMSID when it comes from the function
	var theMMSID;
	
	// Loop through all the LCNs in the record to check for the MMSID
	vm.parentCtrl.item.pnx.search.addsrcrecordid.forEach(processLCNS);
	///console.log("function returns " + theMMSID);

var url = 'https://sussex.rl.talis.com/lcn/' + theMMSID + '/lists.json';


// Make the call to Aspire

$http.jsonp(url,{jsonpCallbackParam: 'cb'})

.then(function handleSuccess(response) {

 $scope.listsFound = response.data;
	
	});


});