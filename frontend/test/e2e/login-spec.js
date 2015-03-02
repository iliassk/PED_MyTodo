'use strict';

describe('ToDoManager e2e login tests', function() {

    beforeEach(function() {
        browser.get('#/login');
    });

    it('should navigate to the register page when the register button is clicked', function() {
        browser.findElement(protractor.By.id('btnRegister')).click();
        expect(browser.getCurrentUrl()).toContain('#/register');

    }, 10000);

    it('should allow a user to log in with correct credentials', function() {

        browser.get('#/login');

        expect(element(by.id('btnLogin')).isEnabled()).toBe(false);
        browser.findElement(protractor.By.id('email')).sendKeys('test@test.com');
        browser.findElement(protractor.By.id('password')).sendKeys('test');
        expect(element(by.id('btnLogin')).isEnabled()).toBe(true);

        browser.findElement(protractor.By.id('btnLogin')).click();
        browser.waitForAngular();

        expect(element(by.id('logout')).isDisplayed()).toBeTruthy();
        browser.findElement(protractor.By.id('logout')).click();

        expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '#/');
    }, 10000);

    it('should not allow a user to log in with incorrect credentials', function() {

        browser.get('#/login');

        expect(element(by.id('btnLogin')).isEnabled()).toBe(false);
        browser.findElement(protractor.By.id('email')).sendKeys('test@test.com');
        browser.findElement(protractor.By.id('password')).sendKeys('invalid');
        expect(element(by.id('btnLogin')).isEnabled()).toBe(true);

        browser.findElement(protractor.By.id('btnLogin')).click();
        browser.waitForAngular();

        expect(element(by.id('logout')).isDisplayed()).toBeFalsy();

        expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '#/login');
    }, 10000);
});