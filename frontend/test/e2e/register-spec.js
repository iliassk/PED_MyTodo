'use strict';

describe('ToDoManager e2e register tests', function() {

	beforeEach(function() {
		browser.get('#/register');
	});

	it('should navigate to the login page when the sign in button is clicked', function() {
		browser.findElement(protractor.By.id('btnLogin')).click();
		expect(browser.getCurrentUrl()).toContain('#/login');

	}, 10000);

	it('should allow registration with required fields', function() {
		browser.get('#/register');

		expect(element(by.id('btnRegister')).isEnabled()).toBe(false);
		browser.findElement(protractor.By.id('username')).sendKeys('tester2');
		browser.findElement(protractor.By.id('email')).sendKeys('test2@test.com');
		browser.findElement(protractor.By.id('password')).sendKeys('test2');
		browser.findElement(protractor.By.id('password_confirmation')).sendKeys('test2');
		expect(element(by.id('btnRegister')).isEnabled()).toBe(true);

		browser.findElement(protractor.By.id('btnRegister')).click();
		browser.waitForAngular();

		expect(element(by.id('logout')).isDisplayed()).toBeTruthy();
		browser.findElement(protractor.By.id('logout')).click();

		expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '#/');

	}, 10000);


	it('should not allow registration if Username exists', function() {
		browser.get('#/register');

		expect(element(by.id('btnRegister')).isEnabled()).toBe(false);
		browser.findElement(protractor.By.id('username')).sendKeys('tester2');
		browser.findElement(protractor.By.id('email')).sendKeys('test2_bis@test.com');
		browser.findElement(protractor.By.id('password')).sendKeys('test2');
		browser.findElement(protractor.By.id('password_confirmation')).sendKeys('test2');
		expect(element(by.id('btnRegister')).isEnabled()).toBe(true);

		browser.findElement(protractor.By.id('btnRegister')).click();
		browser.waitForAngular();


		expect(element(by.id('logout')).isDisplayed()).toBeFalsy();

		expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '#/register');

	}, 10000);

	it('should not allow registration if Email exists', function() {
		browser.get('#/register');

		expect(element(by.id('btnRegister')).isEnabled()).toBe(false);
		browser.findElement(protractor.By.id('username')).sendKeys('tester2_bis');
		browser.findElement(protractor.By.id('email')).sendKeys('test2@test.com');
		browser.findElement(protractor.By.id('password')).sendKeys('test2');
		browser.findElement(protractor.By.id('password_confirmation')).sendKeys('test2');
		expect(element(by.id('btnRegister')).isEnabled()).toBe(true);

		browser.findElement(protractor.By.id('btnRegister')).click();
		browser.waitForAngular();


		expect(element(by.id('logout')).isDisplayed()).toBeFalsy();

		expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '#/register');

	}, 10000);
});