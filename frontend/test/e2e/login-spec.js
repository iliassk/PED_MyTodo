'use strict';

describe('ToDoManager e2e login tests', function() {

    beforeEach(function() {
        browser.get('#/login');
    });

    it('should navigate to the register page when the register button is clicked', function() {
        browser.findElement(protractor.By.id('btnRegister')).click();
        expect(browser.getCurrentUrl()).toContain('#/register');

    }, 10000);

});
