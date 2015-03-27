'use strict';

describe('ToDoManager e2e social login tests', function() {

	beforeEach(function() {
		browser.get('#/login');
	});

	it('should allow a user to log in with correct Google credentials', function() {

		browser.get('#/login');

		expect(element(by.css('.social-gp')).isEnabled()).toBe(true);
		browser.findElement(protractor.By.css('.social-gp')).click();
		browser.waitForAngular();

		browser.getAllWindowHandles().then(function(handles) {
			// switch to the popup
			browser.switchTo().window(handles[1]);

			// do stuff with the popup
			browser.driver.findElement(by.id('Email')).sendKeys('testtodoamanager2@gmail.com');
			browser.driver.findElement(by.id('Passwd')).sendKeys('testtodoamanager2014');
			browser.driver.findElement(by.id('signIn')).click();
			browser.sleep(1000);
			browser.driver.findElement(by.id('submit_approve_access')).click();

			// go back to the main window
			browser.switchTo().window(handles[0]);
		});
		browser.waitForAngular();
		browser.sleep(500);

		expect(element(by.id('logout')).isDisplayed()).toBeTruthy();
		browser.findElement(protractor.By.id('logout')).click();
		// to manage the reload timeout caused by $window.location.reload() in logout
		browser.sleep(500);

		expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '#/');
	}, 30000);

	it('should allow a user to log in with correct Facebook credentials', function() {

		browser.get('#/login');

		expect(element(by.css('.social-fb')).isEnabled()).toBe(true);
		browser.findElement(protractor.By.css('.social-fb')).click();
		browser.waitForAngular();

		browser.getAllWindowHandles().then(function(handles) {
			// switch to the popup
			browser.switchTo().window(handles[1]);

			// do stuff with the popup
			browser.driver.findElement(by.id('email')).sendKeys('testtodoamanager@gmail.com');
			browser.driver.findElement(by.id('pass')).sendKeys('testtodoamanager2014');
			browser.driver.findElement(by.id('u_0_1')).click();
			browser.sleep(1000);
			// Sometimes you need it, sometimes you don't. Thanks fb !
			//browser.driver.findElement(by.css('._4jy1 selected _51sy')).click();

			// go back to the main window
			browser.switchTo().window(handles[0]);
		});
		browser.waitForAngular();
		browser.sleep(500);

		expect(element(by.id('logout')).isDisplayed()).toBeTruthy();
		browser.findElement(protractor.By.id('logout')).click();
		// to manage the reload timeout caused by $window.location.reload() in logout
		browser.sleep(500);

		expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '#/');
	}, 20000);

	it('should allow a user to log in with correct Twitter credentials', function() {

		browser.get('#/login');

		expect(element(by.css('.social-tw')).isEnabled()).toBe(true);
		browser.findElement(protractor.By.css('.social-tw')).click();
		browser.waitForAngular();

		browser.getAllWindowHandles().then(function(handles) {
			// switch to the popup
			browser.switchTo().window(handles[1]);

			// do stuff with the popup
			browser.driver.findElement(by.id('username_or_email')).sendKeys('testtodoamanager@gmail.com');
			browser.driver.findElement(by.id('password')).sendKeys('testtodoamanager2014');
			browser.driver.findElement(by.id('allow')).click();
			browser.sleep(1000);
			//browser.driver.findElement(by.id('submit_approve_access')).click();

			// go back to the main window
			browser.switchTo().window(handles[0]);
		});
		browser.waitForAngular();
		browser.sleep(500);

		expect(element(by.id('logout')).isDisplayed()).toBeTruthy();
		browser.findElement(protractor.By.id('logout')).click();
		// to manage the reload timeout caused by $window.location.reload() in logout
		browser.sleep(500);

		expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '#/');
	}, 20000);

});