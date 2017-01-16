// CRUCIAL BREAKTHROUGH - get a DOM element and display it in the page

  var app = angular.module('viewCustom', ['angularLoad']);

   app.component('prmServiceDetailsAfter', {
	   bindings: { parentCtrl: '<' },
	   controller: 'prmServiceDetailsAfterController',
	   template: '<div class="aspire-lists"><a href="http://liblists.sussex.ac.uk/lcn/{{$ctrl.getMMSID()}}/lists.json?cb=AspireCallBack">Check Aspire for Reading Lists</a></div>'

   });
   
app.controller('prmServiceDetailsAfterController', [function(){

var vm = this;

vm.getMMSID = getMMSID;
 
 function getMMSID() {
	return vm.parentCtrl.item.pnx.search.addsrcrecordid[0];
}

		}]);

