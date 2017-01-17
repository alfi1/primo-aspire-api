// CRUCIAL BREAKTHROUGH - get a DOM element and display it in the page
// 17/01/2017 - another breakthrough. This version allows me to get the MMSID, and check Aspire using $http

  var app = angular.module('viewCustom', ['angularLoad']);

   app.component('prmServiceDetailsAfter', {
	   bindings: { parentCtrl: '<' },
	   //controller: 'prmServiceDetailsAfterController',
	   controller: 'DisplayAspireListsController',
	   template: '<div class="aspire-lists"><a href="http://liblists.sussex.ac.uk/lcn/{{$ctrl.getMMSID()}}/lists.json?cb=AspireCallBack">Check Aspire for Reading Lists</a></div>'
     });
   
		
app.controller('DisplayAspireListsController', function ($scope, $http) {
	
	// Get the MMSID
	var vm = this;

    vm.getMMSID = getMMSID;
 
    function getMMSID() {
	     return vm.parentCtrl.item.pnx.search.addsrcrecordid[0];
        }
      //alert(getMMSID());

	// Make the call to Aspire
   //var url = 'http://liblists.sussex.ac.uk/lcn/9963802302461/lists.json?cb=JSON_CALLBACK';
   var url = 'http://liblists.sussex.ac.uk/lcn/' + getMMSID() + '/lists.json?cb=JSON_CALLBACK';
   $http.jsonp(url)
       .success(function(response) {
           for (var uri in response) {
			   //alert(url);
             console.log(uri + ": " + response[uri]);
           };
      })
    //  error(function (response) {
		//  console.log('FAILED!!');
      //});
});
