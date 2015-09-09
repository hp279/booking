'use strict';

String.prototype.format = String.prototype.f = function () {
  var args = arguments;
  return this.replace(/\{(\d+)\}/g, function (m, n) {
    return args[n] ? args[n] : m;
  });
};

angular.module('bookingApp')
  .factory('BookingsResource', ['$resource', 'RestConfig', function ($resource, RestConfig) {
    const getXAuthentication = function (token) {
      return '{0}:{1}'.f(RestConfig.USER_EMAIL, token);
    }

    const getHeaders = function(token) {
      return  {
        'Content-Type': 'application/json; charset=UTF-8',
        'X-API-Key': 'test_8kBFkhmf8TA7TZyQBh',
        'X-Authentication': getXAuthentication(token)
      }
    }

    return {
      bookings: function(token) {
        return $resource(RestConfig.END_POINT_BASE + '/api/bookings/:bookingId', null,
          {
            get: {
              method: 'GET',
              headers: getHeaders(token)
            }
          });
      },

      bookingServices: function(token) {
        return $resource(RestConfig.END_POINT_BASE + '/api/bookings/:bookingId/services', null,
          {
            get: {
              method: 'GET',
              headers: getHeaders(token)
            }
          });
      }
    }
  }]);
