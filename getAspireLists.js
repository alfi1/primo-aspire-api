//THIS IS BLOODY IT!!
// 18/01/2016

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
   var url = 'http://liblists.sussex.ac.uk/lcn/' + getMMSID() + '/lists.json?cb=JSON_CALLBACK';
   $http.jsonp(url)
   
          .success(function(response) {
			  	$scope.listsFound = response;	
      });

});
