'use strict';

/**
 * @ngdoc overview
 * @name bookingApp
 * @description
 * # bookingApp
 *
 * Main module of the application.
 */
angular
  .module('bookingApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
