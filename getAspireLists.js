//THIS IS BLOODY IT!!
// 17/01/2017 - another breakthrough. This version allows me to get the MMSID, and check Aspire using $http
// Version saved to github
// Now lists the Aspire lists on the display
// 18/01/2017. Another breakthrough - displays the results using ng-repeat!

  var app = angular.module('viewCustom', ['angularLoad']);

       app.component('prmServiceDetailsAfter', {
	   bindings: { parentCtrl: '<' },
	   controller: 'DisplayAspireListsController',
	   	   
	  //template: '<div><span class="bold text">Cited on reading lists:</span><br><ul><li ng-repeat="category in listsFound">Line {{ category }}</li></ul></div>'
	   template: '<div><span class="bold text">Cited on reading lists:</span><ul><li ng-repeat="(url,listname) in listsFound"><a href="{{url}}">{{listname}} </a></li></ul></div>'
	
	   
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
				// alert('http call succeeds');		
		     //$scope.listsFound = results;				 
 
      });

});
