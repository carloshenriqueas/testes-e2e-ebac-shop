class SelecionaProduto {

    selecionaProduto(posicao, quantidade, tamanho, cor ){
        cy.get('[class="product-block grid"]').eq(posicao).click()
        cy.get('.button-variable-item-'+tamanho).click()
        cy.get('.button-variable-item-'+cor).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
    }

}

export default new SelecionaProduto()