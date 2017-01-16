// CRUCIAL BREAKTHROUGH - get a DOM element and display it in the page

   app.component('prmServiceLinksAfter', {
	   bindings: { parentCtrl: '<' },
	   controller: 'prmServiceLinksAfterController',
	   template: '<div class="aspire-lists"><a href="http://liblists.sussex.ac.uk/lcn/{{$ctrl.getMMSID()}}/lists.json?cb=AspireCallBack">Check Aspire for Reading Lists</a></div>'

   });
   
app.controller('prmServiceLinksAfterController', [function(){

var vm = this;

vm.getMMSID = getMMSID;
 
 function getMMSID() {
	return vm.parentCtrl.item.pnx.search.addsrcrecordid[0];
}

		}]);

