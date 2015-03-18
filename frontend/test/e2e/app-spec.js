'use strict';

describe('ToDoManager e2e example tests', function() {

	beforeEach(function() {
		browser.get('index.html');
	});

	it('should automatically redirect to / when location hash is empty', function() {
		expect(browser.getLocationAbsUrl()).toMatch("/");
	});

	it('should consist of 9 menu items', function() {
		var list = element.all(by.css('.nav li'));
		expect(list.count()).toBe(9);
	});
});