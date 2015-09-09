'use strict';

angular.module('bookingApp').directive('bookingList', directive);

function directive() {
  return {
    templateUrl: 'scripts/directives/booking-table.directive.html',
    restrict: 'E',
    controller: ['$scope', '$log', 'AuthService', 'Session', 'BookingsResource', controller],
    controllerAs: 'ctrl',

    link: function postLink(scope, element, attrs) {
    }
  };

  function controller($scope, $log, AuthService, Session, BookingsResource) {
    const self = this;

    self.activeBooking = null;

    $scope.$on('authenticatedEvent', function (event, data) {
      self.updateBookings()
    });

    self.updateBookings = function () {
      BookingsResource.bookings().get(function (data) {
        self.bookings = data.bookings;
      }, function (err) {
        alert('request failed ' + JSON.stringify(err)); // todo
      });
    }

    self.showDetail = function ($event, booking) {
      $event.preventDefault();

      if (self.activeBooking === null || self.activeBooking.id !== booking.id) {
        self.activeBooking = {
          id: booking.id,
          services: []
        };

        BookingsResource.bookingServices().get({bookingId: booking.id}, function (data) {
          Object.assign(self.activeBooking.services,
            _.filter(data.services, {'id': booking.service_id}));

          self.activeBooking.services.map(function (service) {
            service.extraNames = _.pluck(
              _.filter(service.extras, function (extra) {
                return _.pluck(booking.extras, 'extra_id').indexOf(extra.id) != -1
              }), 'name').join(', ');

            service.pricingParameterNames = _.pluck(_.filter(service.pricing_parameters, function (pricing_parameter) {
              return _.pluck(booking.pricing_parameters, 'pricing_parameter_id').indexOf(pricing_parameter.id) != -1
            }), 'name').join(', ');
          });
        }, function (err) {
          alert('request failed ' + JSON.stringify(err)); // todo
        });
      } else {
        self.activeBooking = null;
      }
    }

    self.hideDetails = function ($event) {
      $event.preventDefault();
      self.activeBooking = null;
    }
  }
}
