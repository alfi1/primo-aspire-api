(function(){
"use strict";
'use strict';

// Rewrite for Angular 1.6.  Tim Graves.  16/06/2017
// This version:
// Addresses the Trust issue by whitelisting the Talis url
// Changes the format in which a callback is declared
// Replaces the deprecated .success function

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
	   template: '<div ng-show="listsFound != null"><span class="bold text">Cited on reading lists:</span><ul><li ng-repeat="(url,listname) in listsFound"><a href="{{url}}">{{listname}} </a></li></ul></div>'
	   				
					   
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

// Reorder the elements on the full display
// Based on email from  Frank Pellett - LDS Church History Library


app.component('prmFullViewAfter', {
    bindings: {
        parentCtrl: '<'
    },
    controller: ['sectionOrdering', function (sectionOrdering) {
        var ctrl = this;
        ctrl.$onInit = function () {
            sectionOrdering(ctrl.parentCtrl.services);
        };
    }]
});
app.factory('sectionOrdering', function () {
    return function (sections) {
        if (!sections) return false;

        var numSections = sections.length;
        if (!(numSections > 0)) return false;

        // Move the 'details' section.
        var detailsSection = sections.filter(function (s) {
            return s.serviceName === 'details';
        });
        if (detailsSection.length >= 1) {
            sections.splice(sections.indexOf(detailsSection[0]), 1); //remove
            sections.splice(numSections, 0, detailsSection[0]); //add to the end
        }

        // Move the 'action_list' section.
        var detailsSection = sections.filter(function (s) {
            return s.serviceName === 'action_list';
        });
        if (detailsSection.length >= 1) {
            sections.splice(sections.indexOf(detailsSection[0]), 1); //remove
            sections.splice(numSections, 0, detailsSection[0]); //add to the end
        }

        // Move the 'links' section.
        var linksSection = sections.filter(function (s) {
            return s.serviceName === 'links';
        });
        if (linksSection.length >= 1) {
            sections.splice(sections.indexOf(linksSection[0]), 1); //remove
            sections.splice(numSections, 0, linksSection[0]); //add to the end
        }

        // Move the 'virtualBrowse' section.
        var browseSection = sections.filter(function (s) {
            return s.serviceName === 'virtualBrowse';
        });
        if (browseSection.length >= 1) {
            sections.splice(sections.indexOf(browseSection[0]), 1); //remove
            sections.splice(numSections, 0, browseSection[0]); //add to the end
        }

        // drop the 'more' section.
        var displayResult = sections.filter(function (s) {
            return s.serviceName === 'display';
        });
        if (displayResult.length >= 1) {
            sections.splice(sections.indexOf(displayResult[0]), 1); //remove 'more' section
        }

        return true;
    };
});

/* Add Clickable Logo */

app.controller('prmLogoAfterController', [function () {
	var TG = this;
	TG.getIconLink = getIconLink;
	function getIconLink() {
		return TG.parentCtrl.iconLink;
		}
	}]); 

	app.component('prmLogoAfter',{
	bindings: {parentCtrl: '<'},
	controller: 'prmLogoAfterController',
	template: `<div class="product-logo product-logo-local" layout="row" layout-align="start center" layout-fill id="banner" tabindex="0" role="banner">
	<a href="http://www.sussex.ac.uk/library">
	<img class="logo-image" alt="{{::('nui.header.LogoAlt' | translate)}}" ng-src="{{$ctrl.getIconLink()}}"/></a></div>`
	}); 
	

})();