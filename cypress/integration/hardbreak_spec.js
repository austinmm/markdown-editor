import { AssertionError } from "assert";

describe('Testing the Task List Functionality', function() {
    before(() => {
        // Source for testing https://github.github.com/gfm/#hard-line-breaks
        cy.visit("http://127.0.0.1:5500");
    })

    it(`Test Example 654: A line break (not in a code span or HTML tag) 
        that is preceded by two or more spaces and does not occur at the 
        end of a block is parsed as a hard line break`, function(){
        var test_input = 'hello  {enter}world';
        cy.get('.CodeMirror-code').type(`{cmd}{a}{del}`).type(test_input);
        cy.get('#out').find('p')
            .should('have.html', 'hello<br>world');
    });

    it(`Test Example 655: A backslash before the line ending 
        may be used instead of two spaces`, function(){
        var test_input = 'hello\{enter}world';
        cy.get('.CodeMirror-code').type(`{cmd}{a}{del}`).type(test_input);
        cy.get('#out').find('p')
            .should('have.html', 'hello\nworld');
    });

    it(`Test Example 656: More than two spaces can be used`, function(){
        var test_input = 'hello    {enter}world';
        cy.get('.CodeMirror-code').type(`{cmd}{a}{del}`).type(test_input);
        cy.get('#out').find('p')
            .should('have.html', 'hello<br>world');
    });

    it(`Test Example 657: Leading spaces at the 
        beginning of the next line are ignored`, function(){
        var test_input = 'hello  {enter}    world';
        cy.get('.CodeMirror-code').type(`{cmd}{a}{del}`).type(test_input);
        cy.get('#out').find('p')
            .should('have.html', 'hello<br>world');
    });

    it(`Test Example 658: A backslash before the 
    line ending may be used instead of two spaces
    and leading spaces at the beginning 
    of the next line are ignored`, function(){
        var test_input = 'hello\{enter}    world';
        cy.get('.CodeMirror-code').type(`{cmd}{a}{del}`).type(test_input);
        cy.get('#out').find('p')
            .should('have.html', 'hello\nworld');
    });

    it(`Test Bug Fix: No trailing or leading spaces are present and 
        the two lines containg text are seperated by a middle 
        line containg only a backslash`, function(){
        var test_input = 'hello{enter}\\{enter}world';
        cy.get('.CodeMirror-code').type(`{cmd}{a}{del}`).type(test_input);
        cy.get('#out').find('p')
            .should('have.html', 'hello<br><br>world');
    });
});