'use strict';

angular.module('bookingApp')
  .controller('MainCtrl', ['$scope', 'AuthService', function ($scope, AuthService) {
    $scope.currentUser = null;
    $scope.isAuthenticated = AuthService.isAuthorized;

    $scope.setCurrentUser = function (user) {
      $scope.currentUser = user;
    };

    AuthService.login().then(function (user) {
      $scope.setCurrentUser(user);
      $scope.$broadcast('authenticatedEvent');
    }, function (err) {
      alert("Login failed with error " + JSON.stringify(err)) // todo
    });

  }]);
