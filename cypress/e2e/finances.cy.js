const { func } = require("assert-plus");


beforeEach(() => {
    cy.visit("https://devfinance-agilizei.netlify.app/#")
});
describe('Transaçãoes', () => {
    it('Cadastrar uma entrada', () => {
       criarTransacao("Salario", 1700)

       cy.get("tbody tr td.description").should("have.text", "Salario")
    });  
     
    it('Cadastrar uma saida', () => {
        criarTransacao("Conta de energia", -139.50)

        cy.get("tbody tr td.description").should("have.text", "Conta de energia")

    });

    it('Excluir uma transação', () => {
        criarTransacao("Salario", 1600)
        criarTransacao("Bonus", 50000)

        cy.contains(".description", "Bonus")
        .parent()
        .find('img')
        .click()

        cy.get('tbody tr').should("have.length", 1)

    });

});


function criarTransacao(descricao, valor) {
    cy.contains("Nova Transação").click()
    cy.get('#description'),type(descricao)
    cy.get('#amount').type(valor)
    cy.get('#date').type("2023-02-15") // yyyy-mm-dd
}