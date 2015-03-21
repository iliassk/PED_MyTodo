'use strict';

describe('ToDoManager e2e add/modify/delete todo and general tests', function() {
    var addToDo = 'http://localhost:9000/#/add/todo',
        addList = 'http://localhost:9000/#/todolist'

    beforeEach(function() {
        browser.get('#/');
    });

    it('should allow a user to log in with correct credentials to test the todo functionalities', function() {
        browser.get('#/login');

        expect(element(by.id('btnLogin')).isEnabled()).toBe(false);
        browser.findElement(protractor.By.id('email')).sendKeys('test@test.com');
        browser.findElement(protractor.By.id('password')).sendKeys('test');
        expect(element(by.id('btnLogin')).isEnabled()).toBe(true);

        browser.findElement(protractor.By.id('btnLogin')).click();
        browser.waitForAngular();

        expect(element(by.id('logout')).isDisplayed()).toBeTruthy();

        expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '#/');
    }, 50000);

    it('should test the add Todo and List button', function() {
        browser.get(browser.baseUrl + "#/")
            //add a todo
        element(by.id('addTodoNav')).click()
        expect(browser.getCurrentUrl()).toEqual(addToDo)
        element(by.id('addListNav')).click()
        expect(browser.getCurrentUrl()).toEqual(addList)

        element(by.id('addToDoSideMenu')).click()
        expect(browser.getCurrentUrl()).toEqual(addToDo)
        element(by.id('addListSideMenu')).click()
        expect(browser.getCurrentUrl()).toEqual(addList)
    }, 50000);

    it('should add a list and a todo', function() {

        //Ajoute liste (color input issue is blocking the tests)
        browser.get(browser.baseUrl + "#/todolist")
        expect(browser.getCurrentUrl()).toEqual(addList)

        element(by.model('name')).sendKeys("List_TEST")
        element(by.model('description')).sendKeys("TEST de l'ajout de liste")

        element(by.id('submitListButton')).click()
        browser.waitForAngular()

        //Ajoute todo
        browser.get(browser.baseUrl + "#/add/todo")
        expect(browser.getCurrentUrl()).toEqual(addToDo)

        element(by.model('mytodo.title')).sendKeys("ToDo TEST")
        element(by.cssContainingText('option', 'List_TEST')).click()
        element(by.id('add_todo_button')).click()
        browser.waitForAngular()

        //On vérifie l'ajout
        //ToDo
        browser.get(browser.baseUrl + "#/")
        element(by.cssContainingText('a', "List_TEST")).click()
        browser.waitForAngular()
        element(by.cssContainingText('a', "ToDo TEST")).click()
        browser.waitForAngular()

        expect(browser.getCurrentUrl()).not.toEqual(browser.baseUrl + "#/");

        //List 
        browser.get(browser.baseUrl + "#/")
        element(by.id('List_TESTInfoClick')).click()
        expect(browser.getCurrentUrl()).not.toEqual(browser.baseUrl + "#/");

    }, 50000);

    it('should modify a todo', function() {

        browser.get(browser.baseUrl + "#/")
        element(by.cssContainingText('a', "List_TEST")).click()
        element(by.cssContainingText('a', "ToDo TEST")).click()
        expect(browser.getCurrentUrl()).not.toEqual(browser.baseUrl + "#/");

        element(by.cssContainingText('a', "Edit this todo")).click()
        element(by.model('mytodo.title')).clear().sendKeys("ToDo TEST 2")
        element(by.id('update_todo_button')).click()
        browser.waitForAngular()

        element(by.cssContainingText('a', "ToDo TEST 2")).click()
        expect(browser.getCurrentUrl()).not.toEqual(browser.baseUrl + "#/");
        expect(element(by.model('mytodo.title')).getAttribute('value')).toEqual("ToDo TEST 2")

    }, 50000);

    it('should show all the todos from a list', function() {
        browser.get(browser.baseUrl + "#/")
        element(by.id('List_TESTInfoClick')).click()
        expect(element.all(by.repeater('todo in list.todos')).count()).toEqual(1)
    }, 50000);

    it('should create a share url for a todo|List', function() {
        browser.get(browser.baseUrl + "#/")
        element(by.id('List_TESTInfoClick')).click()
        element(by.id('shareOutSiderToDo')).click()
        browser.waitForAngular()

        expect(element(by.css('.form-control-static')).getText()).not.toEqual('')
    }, 50000);

    it('should delete a todo', function() {
        browser.get(browser.baseUrl + "#/")

        element(by.id('List_TESTInfoClick')).click()
        var initial_count = element.all(by.repeater('todo in list.todos')).count()
        element(by.id('deleteToDoButtonList')).click()
        var last_count = element.all(by.repeater('todo in list.todos')).count()
        expect(initial_count).toBeGreaterThan(last_count);

        browser.findElement(protractor.By.id('logout')).click();
        // to manage the reload timeout caused by $window.location.reload() in logout
        browser.sleep(500);

        expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '#/');

    }, 50000);
});