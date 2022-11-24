

describe('POST  ../characters', () => {

    it('Deve cadastrar um personagem', () => {
        const character = {
            name: 'Natalia Romanoff',
            alias: 'Viúva Negra',
            team: ['S.H.I.E.L.D.', 'Vingadores'],
            active: true
        }

        cy.postCharacter(character)
            .then(response => {
                expect(response.status).to.eql(201)
                cy.log(response.body.character_id)
                expect(response.body.character_id.length).to.eq(24)
            })
    })

    context('Quando o personagem já existe', () => {
        const character = {
            name: 'Bruce Banner',
            alias: 'Hulk',
            team: ['Vingadores'],
            active: true
        }

        before(() => {
            cy.postCharacter(character)
        })

        it('Não deve cadastrar duplicado', () => {
            cy.postCharacter(character)
                .then(response => {
                    expect(response.status).to.eq(400)
                    expect(response.body.error).to.eq('Duplicate character')
                })
        })
    })

    it.only('Todos os campos são obrigatorios', () => {
        const character = {
            name: 'Charles Xavier'
        }

        cy.postCharacter(character)
        .then(response => {
            expect(response.status).to.eql(400)
            expect(response.body.message).to.eql('Validation failed')
        })
    })

})