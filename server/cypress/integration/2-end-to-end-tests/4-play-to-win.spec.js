/// <reference types="cypress" />

describe('2 player plays one card at a time until they win', () => {
    const name = 'Brandon Tam';
    const message = 'Hi how are you doing?';

    const name2 = 'Cypress_Bot';
    const message2 = 'I am the cypress bot';

    it('Go to game room', () => {
        cy.visit('/');

        cy.get('[data-cy=name]').type(name);
        cy.get('[data-cy=create_lobby]').click();

        let lobbyCode;

        cy.get('[data-cy=lobby_code]')
            .invoke('text')
            .then((text) => {
                cy.log(text);
                lobbyCode = text;
            });
        cy.wrap(null).then(() =>
            cy.task('connect', { username: name2, room: lobbyCode }),
        );

        cy.get('button[data-cy=start_game]').click();

        // Game start neutral
        cy.get('[data-cy=clock_card').should('have.text', 'Ace');
        cy.get('div').contains('27').should('exist');

        // Player plays one card
        cy.get('button > img[alt*="of"]').each(($el, index, $list) => {
            cy.wrap($el).first().click('topLeft');
            cy.get('button[data-cy=play_cards]').click();
            cy.task('playCards');
        });
    });
});
