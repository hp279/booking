'use strict';

describe('Service: RestConfig', function () {

  // load the service's module
  beforeEach(module('bookingApp'));

  // instantiate service
  var RestConfig;
  beforeEach(inject(function (_RestConfig_) {
    RestConfig = _RestConfig_;
  }));

  it('should do something', function () {
    expect(!!RestConfig).toBe(true);
  });

});
