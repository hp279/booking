'use strict';

angular.module('bookingApp')
  .controller('MainCtrl', ['$http', function ($http) {
    const self = this;
    const userEmail = "user@email.com";

    self.endPointBase = "https://acme-sandbox.l27.co/api";

    self.endPoints = {
      auth: self.endPointBase + "/auth",
      bookings: self.endPointBase + "/bookings",
      getBookingServices: self.endPointBase + "/bookings_services"
    }

    $http.defaults.headers.common['X-API-Key'] = 'test_8kBFkhmf8TA7TZyQBh';
    $http.defaults.headers.common['Content-Type'] = 'application/json';


    $http.post(self.endPoints.auth, {
      "auth": {
        "email": userEmail,
        "password": "trustno1"
      }
    })
      .then(function (response) {
        let single_access_token = response.data.user.single_access_token;
        $http.defaults.headers.common['X-Authentication'] = userEmail + ":" + single_access_token;

        $http.get(self.endPoints.bookings)
          .then(function (booking_response) {
            self.bookings = booking_response;
            console.log("!!!! " + JSON.stringify(booking_response));
          });

      }, function (response) {
        console.error(response);
      });


    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
