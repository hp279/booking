'use strict';

angular.module('bookingApp')
  .service('Session', function () {
    this.create = function (singleAccessToken, userId, userEmail, userFirstName, userLastName) {
      this.singleAccessToken = singleAccessToken;
      this.userId = userId;
      this.userEmail = userEmail;
      this.userFirstName = userFirstName;
      this.userLastName = userLastName;
    };

    this.destroy = function () {
      this.singleAccessToken = null;
      this.userId = null;
      this.userEmail = null;
      this.userFirstName = null;
      this.userLastName = null;
    };
  });
