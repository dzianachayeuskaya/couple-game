/// <reference types="cypress" />

describe('template spec', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.viewport(700, 900);
    });

    it('Игра имеет поле четыре на четыре клетки, в каждой клетке цифра невидима.', () => {
        cy.get('.memory-card')
            .should('have.length', 16)
            .and('not.have.class', 'flip');
    });

    it('Клик по произвольной карточке открывает ее и оставляет открытой.', () => {
        cy.get('.memory-card').first().click();
        cy.get('.memory-card').first().should('have.class', 'flip');
    });

    it('Поиск пары начинается с клика по левой верхней карточке, как только найдена вторая карточка с таким же номером - карты остаются открыты.', () => {
        cy.get('.memory-card').then(($cards) => {
            const cardsNumbers = $cards.text();
            for (let i = 1; i < cardsNumbers.length; i++) {
                cy.clock();
                cy.get('.memory-card').eq(0).click();
                cy.get('.memory-card').eq(i).click();
                cy.tick(800);
                if (cardsNumbers[0] === cardsNumbers[i]) {
                    cy.get('.memory-card').eq(0).should('have.class', 'flip');
                    cy.get('.memory-card').eq(i).should('have.class', 'flip');
                    return;
                }
            }
        });
    });

    it('Поиск пар начинается с левой верхней карточки, после нахождения её пары продолжается до нахождения всех пар карточек. В случае несовпадения цифр на карточках обе становятся невидимыми.', () => {
        let match = 0;

        function findMatch() {
            cy.get('.memory-card')
                .not('.success')
                .then(($cards) => {
                    const cardsNumbers = $cards.text();
                    for (let i = 1; i < cardsNumbers.length; i++) {
                        cy.clock();
                        cy.get('.memory-card').not('.success').eq(0).click();
                        cy.get('.memory-card').not('.success').eq(i).click();
                        cy.tick(800);
                        if (cardsNumbers[0] === cardsNumbers[i]) {
                            match++;
                            if (match === 8) return;
                            findMatch();
                            return;
                        } else {
                            cy.get('.memory-card')
                                .not('.success')
                                .eq(0)
                                .should('not.have.class', 'flip');
                            cy.get('.memory-card')
                                .not('.success')
                                .eq(i)
                                .should('not.have.class', 'flip');
                        }
                    }
                });
        }
        findMatch();
    });
});
