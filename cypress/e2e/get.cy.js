
describe('GET ../characters', () => {
    const characters = [
        {
            name: 'Natalia Romanoff',
            alias: 'Viúva Negra',
            team: ['S.H.I.E.L.D.', 'Vingadores'],
            active: true
        },
        {
            name: 'Anthony Edward Stark',
            alias: 'Homem de ferro',
            team: ['S.H.I.E.L.D.', 'Vingadores'],
            active: true
        },
        {
            name: 'Grooooot',
            alias: 'Baby Groot',
            team: ['Guardiões da Galáxia', 'Vingadores'],
            active: true
        },
    ]

    before(() => {
        cy.postCharacters(characters)
    })

    it('Deve retornar uma lista com os personagens cadastrados', () => {
        cy.getCharacters()
            .then(response => {
                expect(response.status).to.eq(200)
                //verifica o body da resposta
                expect(response.body).to.be.a('array')
                //verifica a quantidade de item
                expect(response.body.length).to.greaterThan(0)
            })
    })

    it('Deve buscar o personagem por nome', () => {
        cy.getCharacter('Grooooot')
            .then(response => {
                expect(response.status).to.eq(200)
                expect(response.body.length).to.eq(1)
                expect(response.body[0].alias).to.eql('Baby Groot')
                expect(response.body[0].team).to.eql(['Guardiões da Galáxia', 'Vingadores'])
            })
    })
})

describe('GET ../characters/id', () => {
    const homemAranha = {
        name: 'Peter Parker',
        alias: 'Homem Aranha',
        team: ['Novos Vingadores'],
        active: true
    }

    before(() => {
        cy.postCharacter(homemAranha)
        .then(response => {
            Cypress.env('charapterId', response.body.character_id)
        })
    })

    it('Deve buscar o personagem por id', () => {
        const id = Cypress.env('charapterId')
        cy.getCharacterId(id)
        .then(response => {
            expect(response.status).to.eql(200)
            expect(response.body.alias).to.eql('Homem Aranha')
            expect(response.body.team).to.eql(['Novos Vingadores'])
            expect(response.body.active).to.eql(true)
        })
    })
})

it('deve retornar 404 ao buscar por id não cadastrado', function(){
    const id = '62b1d6a5ddd0d3f3730f208f'
    cy.getCharacterId(id).then(function(response){
        expect(response.status).to.eql(404)
    })
})