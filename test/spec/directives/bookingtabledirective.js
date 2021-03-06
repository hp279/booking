'use strict';

describe('Directive: bookingTableDirective', function () {

  // load the directive's module
  beforeEach(module('bookingApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<booking-table-directive></booking-table-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the bookingTableDirective directive');
  }));
});
