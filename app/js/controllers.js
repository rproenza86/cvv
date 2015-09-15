'use strict';

/* Controllers */

var cvvControllers = angular.module('cvvControllers', []);

cvvControllers.config(function($sceProvider) {
  // Completely disable SCE.  For demonstration purposes only!
  // Do not use in new projects.
  $sceProvider.enabled(false);
});

cvvControllers.controller('HomeCtrl', ['$scope', '$http',
  function($scope, $http) {

    var home = this;
    home.arrayData = [];

    $http.get('app/data/home.json').success(function(data){
      home.arrayData = data;
    });

  }]);

cvvControllers.controller('AboutCtrl', ['$scope', '$http','$sce',
  function($scope, $http, $sce) {

    $scope.auxValue = 1;

    var about = this;
    about.arrayData = [];

    $http.get('app/data/about.json').success(function(data){
      about.arrayData = data;
    });

    about.setAuxValue = function(pauxValue) {
      if(pauxValue != 0)
        return true
      else
        return false;
    };

  }]);

cvvControllers.controller('ServicesCtrl', ['$scope', '$http',
  function($scope, $http) {

    var services = this;
    services.arrayData = [];

    $http.get('app/data/servicios.json').success(function(data){
      services.arrayData = data;
    });

  }]);

cvvControllers.controller('ContactCtrl', ['$scope', '$http',
  function($scope, $http) {

    var contact = this;
    contact.arrayData = [];

    $http.get('app/data/contact.json').success(function(data){
      contact.arrayData = data;
    });

  }]);

cvvControllers.controller('MenuCtrl', ['$scope', '$http',
  function($scope, $http) {

    var menu = this;
    menu.arrayData = [];

    $http.get('app/data/menu.json').success(function(data){
      menu.arrayData = data;
    });

  }]);