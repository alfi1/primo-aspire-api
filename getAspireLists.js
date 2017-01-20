// Fully working version.  20/01/2017
// Tim Graves. University of Sussex Library

  var app = angular.module('viewCustom', ['angularLoad']);

       app.component('prmServiceDetailsAfter', {
	   bindings: { parentCtrl: '<' },
	   controller: 'DisplayAspireListsController',
	   template: '<div ng-show="listsFound != null"><span class="bold text">Cited on reading lists:</span><ul><li ng-repeat="(url,listname) in listsFound"><a href="{{url}}">{{listname}} </a></li></ul></div>'
	   });
   
	app.controller('DisplayAspireListsController', function ($scope, $http) {
	
	var vm = this;

	// Get the MMSID
    vm.getMMSID = getMMSID;
 
    function getMMSID() {
	     return vm.parentCtrl.item.pnx.search.addsrcrecordid[0];
        }

   	// Make the call to Aspire
      var url = 'https://sussex.rl.talis.com/lcn/' + getMMSID() + '/lists.json?cb=JSON_CALLBACK';
   
   $http.jsonp(url)
   
          .success(function(response) {
			  			  
			  	$scope.listsFound = response;	
      });

});
