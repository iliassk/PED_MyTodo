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

		browser.findElement(protractor.By.id('Email')).sendKeys('testtodoamanager@gmail.com');
		browser.findElement(protractor.By.id('Passwd')).sendKeys('testtodoamanager2014');

		browser.findElement(protractor.By.id('signIn')).click();
		browser.waitForAngular();

		expect(element(by.id('logout')).isDisplayed()).toBeTruthy();
		browser.findElement(protractor.By.id('logout')).click();
		browser.waitForAngular();

		expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '#/');
	}, 20000);

	it('should allow a user to log in with correct Facebook credentials', function() {

		browser.get('#/login');

		expect(element(by.css('.social-fb')).isEnabled()).toBe(true);
		browser.findElement(protractor.By.css('.social-fb')).click();
		browser.waitForAngular();

		browser.findElement(protractor.By.id('email')).sendKeys('testtodoamanager@gmail.com');
		browser.findElement(protractor.By.id('pass')).sendKeys('testtodoamanager2014');

		browser.findElement(protractor.By.id('u_0_1')).click();
		browser.waitForAngular();

		expect(element(by.id('logout')).isDisplayed()).toBeTruthy();
		browser.findElement(protractor.By.id('logout')).click();
		browser.waitForAngular();

		expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '#/');
	}, 20000);


	it('should allow a user to log in with correct Twitter credentials', function() {

		browser.get('#/login');

		expect(element(by.css('.social-tw')).isEnabled()).toBe(true);
		browser.findElement(protractor.By.css('.social-tw')).click();
		browser.waitForAngular();

		browser.findElement(protractor.By.id('username_or_email')).sendKeys('testtodoamanager@gmail.com');
		browser.findElement(protractor.By.id('password')).sendKeys('testtodoamanager2014');

		browser.findElement(protractor.By.id('allow')).click();
		browser.waitForAngular();

		expect(element(by.id('logout')).isDisplayed()).toBeTruthy();
		browser.findElement(protractor.By.id('logout')).click();
		browser.waitForAngular();

		expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '#/');
	}, 20000);

});