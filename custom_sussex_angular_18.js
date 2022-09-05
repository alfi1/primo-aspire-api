(function(){
"use strict";
'use strict';

// Rewrite for Angular 1.6.  Tim Graves.  16/06/2017
// This version:
// Addresses the Trust issue by whitelisting the Talis url
// Changes the format in which a callback is declared
// Replaces the deprecated .success function
// Updated prior to VE update to Angular 1.8. TG. 05/09/2022

var app = angular.module('viewCustom', ['angularLoad'])

// Whitelisting
.constant('AspireTrustBaseUrl', "https://sussex.rl.talis.com/").config(['$sceDelegateProvider', 'AspireTrustBaseUrl', function ($sceDelegateProvider, AspireTrustBaseUrl) {
  var urlWhitelist = $sceDelegateProvider.resourceUrlWhitelist();
  urlWhitelist.push(AspireTrustBaseUrl + '**');
  $sceDelegateProvider.resourceUrlWhitelist(urlWhitelist);
}]);

// End of whitelisting
  
       app.component('prmServiceDetailsAfter', {
	   bindings: { parentCtrl: '<' },
	   controller: 'DisplayAspireListsController',
	   //template: '<div ng-show="listsFound != null"><span class="bold text">Cited on reading lists:</span><ul><li ng-repeat="(url,listname) in listsFound"><a href="{{url}}">{{listname}} </a></li></ul></div>'
	   // Improved line. TG. 06/06/2022
	   template: '<div ng-if="listsFound"><span class="bold text">Cited on reading lists:</span><ul><li ng-repeat="(url,listname) in listsFound"><a href="{{url}}">{{listname}} </a></li></ul></div>'
	   				
					   
	   });
 
 
app.controller('DisplayAspireListsController', function($scope, $http) {
    var vm = this;

    this.$onInit = function(){
      {
        // Uncomment if you want to browse the object's contents
        //console.log(this);
        //console.log(vm.parentCtrl.item.pnx.display.mms[0]);

        // Declare a global variable to hold the MMSID when it comes from the function
        var theMMSID = vm.parentCtrl.item.pnx.display.mms[0];
        //console.log("function returns " + theMMSID);

        var url = 'https://sussex.rl.talis.com/lcn/' + theMMSID + '/lists.json';


        // Make the call to Aspire

        $http.jsonp(url,{jsonpCallbackParam: 'cb'})

        .then(function handleSuccess(response) {

         $scope.listsFound = response.data;
            
            });
      }
    };
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

/* app.controller('prmLogoAfterController', [function () {
	var TG = this;
	TG.getIconLink = getIconLink;
	function getIconLink() {
		return TG.parentCtrl.iconLink;
		}
	}]); 

	app.component('prmLogoAfter',{
	bindings: {parentCtrl: '<'},
	controller: 'prmLogoAfterController',
	template: '<div class="product-logo product-logo-local" layout="row" layout-align="start center" layout-fill id="banner" tabindex="0" role="banner"><a href="http://www.sussex.ac.uk/library"><img class="logo-image" alt="{{::(\'nui.header.LogoAlt\' | translate)}}" ng-src="{{$ctrl.getIconLink()}}"/></a></div>'
	}); */



// Add a link to the appropiate Harvard styling for Sussex
// TG 03/07/2017
  
app.component('prmActionContainerAfter', {

  bindings: { parentCtrl: '<' },
  template: '<br><div><a href="http://www.sussex.ac.uk/skillshub/?id=286">For guidance on referencing this item visit the Skills Hub</a><br><a href="https://www.sussex.ac.uk/library/using-the-library/reformat" target="_blank">To convert this file into a format that is accessible for you, visit SensusAccess</a></div>'

});

// End of adding Harvard reference	


// Click and collect wording

//app.component('prmServiceHeaderAfter', {

//  bindings: { parentCtrl: '<' },
//  template: '<br><div><p>Access this book through our <a href="https://www.sussex.ac.uk/library/using-the-library/click-and-study">Click & Study</a> or <a href="https://www.sussex.ac.uk/library/using-the-library/click-and-collect">Click & Collect</a> services</p></div>'

//});

// End of click and collect

// Add the Olark Chatbox
 window.setInterval(function() {
    (function(o, l, a, r, k, y) {
        if (o.olark) return;
        r = "script";
        y = l.createElement(r);
        r = l.getElementsByTagName(r)[0];
        y.async = 1;
        y.src = "//" + a;
        r.parentNode.insertBefore(y, r);
        y = o.olark = function() {
            k.s.push(arguments);
            k.t.push(+new Date)
        };
        y.extend = function(i, j) {
            y("extend", i, j)
        };
        y.identify = function(i) {
            y("identify", k.i = i)
        };
        y.configure = function(i, j) {
            y("configure", i, j);
            k.c[i] = j
        };
        k = y._ = {
            s: [],
            t: [+new Date],
            c: {},
            l: a
        };
    })(window, document, "static.olark.com/jsclient/loader.js");
    // custom configuration goes here (www.olark.com/documentation) 
	olark.configure('system.hb_primary_color', '#FFB81C');
	
	// Change the wording 
	olark.configure("locale.welcome_title", "Chat with Library Staff");
	
    olark.identify('3859-248-10-5096');
}, 500);
// End of Olark code

})();

// Google Analytics tracker

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  
  ga('create', 'UA-106909617-1', 'auto');
  ga('send', 'pageview');


 // End of Google Analytics
