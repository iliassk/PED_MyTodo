'use strict';

describe('Service: offlineService', function () {

  // load the service's module
  beforeEach(module('ToDoManagerApp'));

  // instantiate service
  var offlineService;
  beforeEach(inject(function (_offlineService_) {
    offlineService = _offlineService_;
  }));

  it('should do something', function () {
    expect(!!offlineService).toBe(true);
  });

});
