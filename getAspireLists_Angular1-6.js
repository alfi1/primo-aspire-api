// Rewrite for Angular 1.6.  Tim Graves.  16/06/2017
// This version:
// Addresses the Trust issue by whitelisting the Talis url
// Changes the format in which a callback is declared
// Replaces the deprecated .success


var app = angular.module('viewCustom', ['angularLoad'])

// Whitelisting
.constant('AspireTrustBaseUrl', "https://sussex.rl.talis.com/")

.config(['$sceDelegateProvider', 'AspireTrustBaseUrl', ($sceDelegateProvider, AspireTrustBaseUrl) => {
    let urlWhitelist = $sceDelegateProvider.resourceUrlWhitelist();
    urlWhitelist.push(`${AspireTrustBaseUrl}**`); 
    $sceDelegateProvider.resourceUrlWhitelist(urlWhitelist);
  }]);

// End of whitelisting
  
       app.component('prmServiceDetailsAfter', {
	   bindings: { parentCtrl: '<' },
	   controller: 'DisplayAspireListsController',
	   template: '<div ng-show="listsFound != null"><span class="bold text">{{$ctrl.getMMSID()}} Cited on reading lists:</span><ul><li ng-repeat="(url,listname) in listsFound"><a href="{{url}}">{{listname}} </a></li></ul></div>'
	   				
					   
	   });
 
 
app.controller('DisplayAspireListsController', function ($scope, $http) {
	
	var vm = this;

	// Get the MMSID
    vm.getMMSID = getMMSID;
 
    function getMMSID() {
	     return vm.parentCtrl.item.pnx.search.addsrcrecordid[0];
       }

  
	  var url = 'https://sussex.rl.talis.com/lcn/' + getMMSID() + '/lists.json';
	  	   

// Make the call to Aspire

$http.jsonp(url,{jsonpCallbackParam: 'cb'})

.then(function handleSuccess(response) {

 $scope.listsFound = response.data;
	
	});


});

