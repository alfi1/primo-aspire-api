// Fully working version.  20/01/2017
// Tim Graves. University of Sussex Library
// 23/01/2017.  Aspire bookmarklet API link added.

  var app = angular.module('viewCustom', ['angularLoad']);

       app.component('prmServiceDetailsAfter', {
	   bindings: { parentCtrl: '<' },
	   controller: 'DisplayAspireListsController',
	   template: '<div ng-show="listsFound != null"><span class="bold text">Cited on reading lists:</span><ul><li ng-repeat="(url,listname) in listsFound"><a href="{{url}}">{{listname}} </a></li></ul></div><div><a href="https://sussex.rl.talis.com/ui/forms/bookmarklet.html?bibid={{$ctrl.getMMSID()}}">Add this item to a reading list</a></div>'
	   });
   
	app.controller('DisplayAspireListsController', function ($scope, $http) {
	
	var vm = this;
	// Uncomment if you want to browse the object's contents
    //   console.log(this);
		
	// Get the MMSID
    vm.getMMSID = getMMSID;
 
		function getMMSID($scope) {
	     return vm.parentCtrl.item.pnx.search.addsrcrecordid[0];
        }

   	// Make the call to Aspire
      var url = 'https://sussex.rl.talis.com/lcn/' + getMMSID() + '/lists.json?cb=JSON_CALLBACK';
   
   $http.jsonp(url)
   
          .success(function(response) {
			  			  
			  	$scope.listsFound = response;	
      });

});
