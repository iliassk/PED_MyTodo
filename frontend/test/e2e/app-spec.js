'use strict';

describe('ToDoManager e2e simple tests', function() {

	beforeEach(function() {
		browser.get('index.html');
	});

	it('should automatically redirect to / when location hash is empty', function() {
		expect(browser.getLocationAbsUrl()).toMatch("/");
	});

	it('should consist of ToDoManager as heading', function() {
		element(by.css('.navbar-brand')).getText().then(function(name) {
			expect(name).toBe('ToDoManager');
		});
	});

	it('should consist of 4 menu items', function() {
		var list = element.all(by.css('.nav li'));
		expect(list.count()).toBe(4);
	});
});