describe('dash flow', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('deve selecionar o ano 1990 e clicar em Pesquisar', () => {
        cy.get('#searchYear').select('1990');

        cy.contains('button', 'Pesquisar').click();

        cy.get('tbody').find('tr').should('have.length.gt', 0);
        cy.get('tbody').contains('1990').should('exist');
    });
});
