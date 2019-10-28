describe('Testing XSS Blocking', function() {
    before(() => {
        cy.visit("./index.html");
    });

    it(`Test Event Attribute Self Closing`, function() {
        const input = "<sup onmouseover=\"alert('hi')\"/>";
        cy.get('.CodeMirror-code').type(`{cmd}{a}{del}`).type(input);
        cy.get('#out').find('p').should('not.exist');
    });

    it(`Test Event Attribute Full`, function() {
        const input = "<sup onmouseover=\"alert('hi')\"></sup>";
        cy.get('.CodeMirror-code').type(`{cmd}{a}{del}`).type(input);
        cy.get('#out').find('p').should('not.exist');
    });

    it(`Test AllowScriptAccess Attribute always`, function() {
        const input = '<embed AllowScriptAccess="always"></embed>';
        cy.get('.CodeMirror-code').type(`{cmd}{a}{del}`).type(input);
        cy.get('#out').find('p').should('not.exist');
    });

    it(`Test AllowScriptAccess Attribute sameDomain`, function() {
        const input = '<embed AllowScriptAccess="sameDomain"></embed>';
        cy.get('.CodeMirror-code').type(`{cmd}{a}{del}`).type(input);
        cy.get('#out').find('p').should('not.exist');
    });

    it(`Test AllowScriptAccess Attribute never`, function() {
        const input = '<embed AllowScriptAccess="never">allowed</embed>';
        cy.get('.CodeMirror-code').type(`{cmd}{a}{del}`).type(input);
        cy.get('#out').find('embed').should('exist');
    });
});
