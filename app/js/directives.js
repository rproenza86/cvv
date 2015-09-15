'use strict';

/* Directives */
(
    function()
    {
        var cvvDirectives = angular.module('cvvDirectives', []);

        cvvDirectives.directive('homePage',function(){
            return{
                restrict: 'E',
                templateUrl: 'partials/home-page.html'
            };
        });
	}
)();
