'use strict';

describe('Service: BookingsResource', function () {

  // load the service's module
  beforeEach(module('bookingApp'));

  // instantiate service
  var BookingsResource;
  beforeEach(inject(function (_BookingsResource_) {
    BookingsResource = _BookingsResource_;
  }));

  it('should do something', function () {
    expect(!!BookingsResource).toBe(true);
  });

});
