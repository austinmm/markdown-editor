import { AssertionError } from "assert";

describe('Testing the Task List Functionality', function() {
    before(() => {
        cy.visit("http://127.0.0.1:5500");
    })

    it('Test Checked Task List Item', function(){
        var _text = 'item';
        var tasklist_text = '- [x] ' + _text;
        cy.get('.CodeMirror-code').type(`{cmd}{a}{del}`).type(`${tasklist_text}`);
        cy.get('#out > ul > li')
            .should('contain', _text)
            .should('have.css', 'list-style-type')
            .and('match', /none/)
        cy.get('#out > ul > li > input')
            .should('be.disabled')
            .should('be.checked');
    });

    it('Test Unchecked Task List Item', function(){
        var _text = 'item';
        var tasklist_text = '- [ ] ' + _text;
        cy.get('.CodeMirror-code').type(`{cmd}{a}{del}`).type(`${tasklist_text}`);
        cy.get('#out > ul > li')
            .should('contain', _text)
            .should('have.css', 'list-style-type')
            .and('match', /none/)
        cy.get('#out > ul > li > input')
            .should('be.disabled')
            .should('be.not.checked');
    });

    it('Test Nested Task List Items', function(){
        var p_text = 'parent_item';
        var c_text = 'child_item';
        var tasklist_text = '- [ ] ' + p_text;
        cy.get('.CodeMirror-code').type(`{cmd}{a}{del}`).type(`${tasklist_text}`);
        tasklist_text = '[x] ' + c_text;
        cy.get('.CodeMirror-code').type(`{enter}{leftArrow}{leftArrow}    `).type(`${tasklist_text}`);
        cy.get('#out > ul > :first-child')
            .should('contain', p_text)
            .should('have.css', 'list-style-type')
            .and('match', /none/)
        cy.get('#out > ul > :first-child > input')
            .should('be.disabled')
            .should('be.not.checked');
        cy.get('#out > ul > :first-child > ul')
            .find('li')
                .should('contain', c_text)
                .should('have.css', 'list-style-type').and('match', /none/)
        cy.get('#out > ul :first-child > ul > :first-child > input')
            .should('be.disabled')
            .should('be.checked');
    });
});