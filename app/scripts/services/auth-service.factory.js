'use strict';

angular.module('bookingApp')
  .factory('AuthService', ['$http', 'Session', 'RestConfig', function ($http, Session, RestConfig) {
    let authService = {};

    const headers = {headers: {'Content-Type': 'application/json', 'X-API-Key': RestConfig.API_KEY}};

    authService.login = function () {
      return $http.post(RestConfig.END_POINT_BASE + "/api/auth", {
        "auth": {
          "email": RestConfig.USER_EMAIL,
          "password": RestConfig.USER_PASSWORD
        }
      }, headers).then(function (response) {
        Session.create(
          response.data.user.single_access_token,
          response.data.user.id,
          response.data.user.email,
          response.data.user.first_name,
          response.data.user.last_name
        )
        return response.data.user;
      })
    }

    authService.isAuthenticated = function () {
      return !!Session.singleAccessToken;
    };

    return authService;
  }]);
