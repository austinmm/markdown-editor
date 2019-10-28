describe('Testing PlantUML Support', function() {
    before(() => {
        cy.visit("./index.html");
    });

    it(`PlantUML Tag Not Valid`, function() {
        const input = "```plantuml```";
        cy.get('.CodeMirror-code').type(`{cmd}{a}{del}`).type(input);
        cy.get('#out').find('img').should('not.exist');
    });

    it(`PlantUML Tag Valid Single Line`, function() {
        const input = "```plantuml node a```";
        cy.get('.CodeMirror-code').type(`{cmd}{a}{del}`).type(input);
        cy.get('#out').find('img').should('exist');
    });

    it(`PlantUML Tag Valid Multi-Line`, function() {
        const input = `
        \`\`\`plantuml
        node a
        node b
        a -- b
        \`\`\``;
        cy.get('.CodeMirror-code').type(`{cmd}{a}{del}`).type(input);
        cy.get('#out').find('img').should('exist');
    });
});
