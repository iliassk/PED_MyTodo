'use strict';

describe('ToDoManager e2e add/modify/delete todo and general tests', function() {
    var app = 'http://localhost:9000/',
        addToDo = 'http://localhost:9000/#/add/todo',
        addList = 'http://localhost:9000/#/todolist'

    var user_test_email = "test@test.fr",
        user_test_password = "test",
        user_test_login = "test"

    //Créé ou log l'utilisateur de test
    function logOrAddUser(){
        //test la création 
        browser.get(app+'#/register');
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
        browser.get(app+'#/register');
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
        logOrAddUser()
    });

    it('should test the add Todo and List button', function() {
        browser.get(app+"#/")
        //add a todo
        element (by.id('addTodoNav')).click()
        expect(browser.getCurrentUrl()).toEqual(addToDo)
        element (by.id('addListNav')).click()
        expect(browser.getCurrentUrl()).toEqual(addList)

        element (by.id('addToDoSideMenu')).click()
        expect(browser.getCurrentUrl()).toEqual(addToDo)
        element (by.id('addListSideMenu')).click()
        expect(browser.getCurrentUrl()).toEqual(addList)
    }, 10000);

    it('should add a list and a todo', function() {

        //Ajoute liste
        browser.get(app+"#/todolist")
        expect(browser.getCurrentUrl()).toEqual(addList)

        element(by.model('name')).sendKeys("List_TEST")
        element(by.model('description')).sendKeys("TEST de l'ajout de liste")
        element(by.model('color')).sendKeys("#000000")
        element (by.id('submitListButton')).click()
        browser.waitForAngular()
        
        //Ajoute todo
        browser.get(app+"#/add/todo")
        expect(browser.getCurrentUrl()).toEqual(addToDo)
        
        element(by.model('mytodo.title')).sendKeys("ToDo TEST")
        element(by.cssContainingText('option', 'List_TEST')).click()
        element(by.id('add_todo_button')).click()
        browser.waitForAngular()

        //On vérifie l'ajout
        //ToDo
        browser.get(app+"#/")
        element(by.cssContainingText('a', "ToDo TEST")).click()
        browser.waitForAngular()
        expect(browser.getCurrentUrl().toEqual(app+"#/")).toBe(false)

        //List
        browser.get(app+"#/")
        element (by.id('List_TESTInfoClick')).click()
        expect(browser.getCurrentUrl().toEqual(app+"#/")).toBe(false)

    }, 10000);

    it('should modify a todo', function() {

        browser.get(app+"#/")
        element(by.cssContainingText('a', "ToDo TEST")).click()
        expect(browser.getCurrentUrl().toEqual(app+"#/")).toBe(false)

        element(by.model('mytodo.title')).sendKeys("ToDo TEST 2")
        element(by.id('update_todo_button')).click()
        browser.waitForAngular()

        element(by.cssContainingText('a', "ToDo TEST 2")).click()
        expect(browser.getCurrentUrl().toEqual(app+"#/")).toBe(false)
        expect(element(by.model('mytodo.title')).getAttribute('value')).toEqual("ToDo TEST 2")

    }, 10000);

    it('should show all the todos from a list', function() {
        browser.get(app+"#/")
        element (by.id('List_TESTInfoClick')).click()
        expect(element.all(by.repeater('todo in list.todos')).count()).toEqual(1)
    }, 10000);

    it('should create a share url for a todo|List', function() {
        browser.get(app+"#/")
        element (by.id('List_TESTInfoClick')).click()
        element (by.id('shareOutSiderToDo')).click()
        browser.waitForAngular()

        expect(element(by.model('url')).getText()).not.toEqual('')
    }, 10000);

    it('should delete a todo', function() {
        browser.get(app+"#/")

        element (by.id('List_TESTInfoClick')).click()
        var initial_count = element.all(by.repeater('todo in list.todos')).count()
        element (by.id('deleteToDoButtonList')).click()
        var last_count = element.all(by.repeater('todo in list.todos')).count()
        expect(initial_count).toBeGreaterThan(last_count);

    }, 10000);
});