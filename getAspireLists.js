// 17/01/2017 - another breakthrough. This version allows me to get the MMSID, and check Aspire using $http
// Version saved to github
// Now lists the Aspire lists on the display

  var app = angular.module('viewCustom', ['angularLoad']);

   app.component('prmServiceDetailsAfter', {
	   bindings: { parentCtrl: '<' },
	   controller: 'DisplayAspireListsController',
	   //template: '<div> <span class="bold text">Aspire lists </span>{{$ctrl.getResults()}}</div>'
	   //template: '<div> <span class="bold text">Cited on reading lists:</span><br>{{$ctrl.getResults()}}</div>'
	   
	   //template: '<ul>  <li ng-repeat="x in {{$ctrl.getResults()}}" > {{ x }} </li></ul>'

	   
	   template: '<div> <span class="bold text">Cited on reading lists:</span><br>{{$ctrl.getResults()}}</div>'
	   
     });
   
	app.controller('DisplayAspireListsController', function ($scope, $http) {
	
	var vm = this;

   // Set up an empty array ready for the Aspire lists
   var results = [];
   
	// Get the MMSID
    vm.getMMSID = getMMSID;
 
    function getMMSID() {
	     return vm.parentCtrl.item.pnx.search.addsrcrecordid[0];
        }

   	// Make the call to Aspire
   var url = 'http://liblists.sussex.ac.uk/lcn/' + getMMSID() + '/lists.json?cb=JSON_CALLBACK';
   $http.jsonp(url)
       
          .success(function(response) {
           for (var uri in response) {
			 // Push them into an array
			 results.push(uri + response[uri]);
			 			 
           };
	
   	     vm.getResults = getResults;
		
// Trying to get a way to pass teh scope to the directive template		
		function getResults($scope) {
		//function getResults() {
         // test value to work out how to get the arrays iterating in the directive template
		 //results = 'Hello World';
		return results;

		}
		  
      })

});
