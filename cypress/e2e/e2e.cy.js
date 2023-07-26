/// <reference types="cypress" />
//const perfil = require('../fixtures/perfil.json')
import SelecionaProduto from '../support/page_objects/selecionaProduto.page'
const { faker, fakerPT_BR } = require('@faker-js/faker')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/')
        cy.get('.icon-user-unfollow').click()
        cy.fixture('perfil').then((dados)=>{
            cy.login(dados.usuario, dados.senha)
        })
        //cy.login(perfil.usuario, perfil.senha) //- Outra forma de fazer com fixture
        

    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //TODO
        cy.get('#primary-menu > .menu-item-629 > a').click()
        SelecionaProduto.selecionaProduto('0','8', 'XS', 'Blue')
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get(':nth-child(2) > .page-numbers').click()
        SelecionaProduto.selecionaProduto('0','5', 'XS', 'Blue')
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get(':nth-child(2) > .page-numbers').click()
        SelecionaProduto.selecionaProduto('1','10', 'S', 'Black')
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get(':nth-child(2) > .page-numbers').click()
        SelecionaProduto.selecionaProduto('2','3', 'XS', 'Blue')
        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()
        //finalizando a compra
        let fakername = faker.person.firstName()
        let fakersobrenome = faker.person.lastName()
        let fakerempresa = faker.company.name()
        let fakerendereco = faker.location.streetAddress()
        let fakercidade = faker.location.city()
        let fakerestado = faker.location.state()
        let fakercep = faker.location.zipCode()
        let fakermail = faker.internet.email({fakername})

        cy.cadastrofaturamento(fakername, fakersobrenome, fakerempresa, 'Brasil',  fakerendereco, fakercidade, fakerestado, fakercep, fakermail)
        cy.get('#terms').click()
        cy.get('#place_order').click()
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
        
    })


})