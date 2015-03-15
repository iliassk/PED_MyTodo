'use strict';

describe('ToDoManager e2e add/modify/delete todo and general tests', function() {

    var user_test_email = "test@test.fr",
        user_test_password = "test",
        user_test_login = "test";

    function logOrAddUser(){
        //test la création 
        browser.get('#/register');
        expect(element(by.id('btnRegister')).isEnabled()).toBe(false);
        browser.findElement(protractor.By.id('username')).sendKeys(user_test_login);
        browser.findElement(protractor.By.id('email')).sendKeys(user_test_email);
        browser.findElement(protractor.By.id('password')).sendKeys(user_test_password);
        browser.findElement(protractor.By.id('password_confirmation')).sendKeys(user_test_password);
        expect(element(by.id('btnRegister')).isEnabled()).toBe(true);

        browser.findElement(protractor.By.id('btnRegister')).click();
        browser.waitForAngular();

        //si le bouton log out est visible c'est que c'est ok
        if(element(by.id('logout')).isDisplayed()){
            expect(element(by.id('logout')).isDisplayed()).toBeTruthy();
            return
        }
        browser.get('#/register');
        //sinon on se log car le compte existe déjà
        expect(element(by.id('btnLogin')).isEnabled()).toBe(false);
        browser.findElement(protractor.By.id('email')).sendKeys(user_test_email);
        browser.findElement(protractor.By.id('password')).sendKeys(user_test_password);
        expect(element(by.id('btnLogin')).isEnabled()).toBe(true);

        browser.findElement(protractor.By.id('btnLogin')).click();
        browser.waitForAngular();

        expect(element(by.id('logout')).isDisplayed()).toBeTruthy();
        //le login est terminé est fonctionelle sinon le expect fail
    }

    beforeEach(function() {
        logOrAddUser();
    });

    it('should create and/or log a test user', function() {
        
        
        
    }, 10000);

    it('should test the add Todo and List button', function() {

        
    }, 10000);

    it('should add a list and a todo', function() {

        



    }, 10000);

    it('should modify a todo', function() {

        



    }, 10000);

    it('should delete a todo', function() {

        



    }, 10000);

    it('should show all the todos from a list', function() {

        
    }, 10000);

    it('should create a share url for a todo', function() {

        
    }, 10000);


});