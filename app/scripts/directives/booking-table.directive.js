'use strict';

angular.module('bookingApp').directive('bookingList', ['$http', directive])

function directive($http) {
  return {
    templateUrl: 'scripts/directives/booking-table.directive.html',
    restrict: 'E',
    controller: ['$scope', '$log', '$http', controller],
    controllerAs: 'ctrl',

    link: function postLink(scope, element, attrs) {
    }
  };

  function controller($scope, $log, $http) {
    const self = this;

    const USER_EMAIL = "user@email.com";
    const USER_PASSWORD = "trustno1";
    const API_KEY = "test_8kBFkhmf8TA7TZyQBh";

    const endPointBase = "https://acme-sandbox.l27.co/api";
    const endPoints = {
      auth: endPointBase + "/auth",
      bookings: endPointBase + "/bookings",
      bookingServices: endPointBase + "/bookings/{0}/services",
    }

    $http.defaults.headers.common['X-API-Key'] = API_KEY;
    $http.defaults.headers.common['Content-Type'] = 'application/json';

    String.prototype.format = String.prototype.f = function () {
      var args = arguments;
      return this.replace(/\{(\d+)\}/g, function (m, n) {
        return args[n] ? args[n] : m;
      });
    };

    self.activeBooking = null;

    self.showDetail = function ($event, booking) {
      $event.preventDefault();

      if (self.activeBooking === null || self.activeBooking.id !== booking.id) {
        self.activeBooking = {
          id: booking.id,
          services: []
        };

        $http.get(endPoints.bookingServices.f(booking.id))
          .then(function (booking_response) {
            self.activeBooking.services = Object.assign(self.activeBooking.services, booking_response.data.services);
            self.activeBooking.services.map(function (service) {
              service.extraNames = _.pluck(service.extras, 'name').join(', ');
              service.pricingParameterNames = _.pluck(service.pricing_parameters, 'name').join(', ');
            })
          });
      }
      else {
        self.activeBooking = null;
      }
    }

    self.hideDetails = function ($event) {
      $event.preventDefault();
      self.activeBooking = null;
    }

    $http.post(endPoints.auth, {
      "auth": {
        "email": USER_EMAIL,
        "password": USER_PASSWORD
      }
    })
      .then(function (response) {
        let single_access_token = response.data.user.single_access_token;
        $http.defaults.headers.common['X-Authentication'] = '{0}:{1}'.f(USER_EMAIL, single_access_token);

        $http.get(endPoints.bookings)
          .then(function (booking_response) {
            self.bookings = booking_response.data.bookings;
          });

      }, function (response) {
        alert('Error: ' + JSON.stringify(response));
      });
  }
}
