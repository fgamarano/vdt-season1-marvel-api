// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('apiResetUser', () => {
    cy.api({
        url: 'back2thepast/6368d89d54350a00169b5eec',
        method: 'DELETE',
        failOnStatusCode: false
    }).then(response => {
        expect(response.status).to.eq(200)
    })

})

Cypress.Commands.add('apiLogin', () => {
    cy.apiResetUser()
    cy.api({
        url: '/sessions',
        method: 'POST',
        body: {
            email: 'gamarano@qacademy.io',
            password: 'qa-cademy'
        },
        failOnStatusCode: false
    }).then(response => {
        expect(response.status).to.eq(200)
        //cy.log(response.body.token)
        Cypress.env('token', response.body.token)
    })
})

Cypress.Commands.add('postCharacter', (character) => {
    cy.api({
        method: 'POST',
        url: '/characters',
        body: character,
        headers: { Authorization: Cypress.env('token')},
        failOnStatusCode: false
    }).then(response => {
        return response
    })
})

Cypress.Commands.add('postCharacters', (characters) => {
    characters.forEach((c) => {
        cy.postCharacter(c)
    })
})

Cypress.Commands.add('getCharacters', () => {
    cy.api({
        method: 'GET',
        url: '/characters',
        headers: { Authorization: Cypress.env('token')},
        failOnStatusCode: false
    }).then(response => {
        return response
    })
})

Cypress.Commands.add('getCharacter', (characterName) => {
    cy.api({
        method: 'GET',
        url: '/characters',
        headers: { Authorization: Cypress.env('token')},
        qs: {name: characterName},
        failOnStatusCode: false
    }).then(response => {
        return response
    })
})

Cypress.Commands.add('getCharacterId', function (characterId) {
    cy.api({
        method: 'GET',
        url: '/characters/' + characterId,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

Cypress.Commands.add('deleteCharacterId', function (characterId) {
    cy.api({
        method: 'DELETE',
        url: '/characters/' + characterId,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

