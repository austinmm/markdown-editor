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
});