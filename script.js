import { Card } from './classes/Card.js';
document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.querySelector('.cards');
    const container = document.querySelector('.container');

    let lockBoard = false;
    let firstCard, secondCard;
    let openCardCounter = 0;
    const finishButton = document.createElement('button');
    finishButton.textContent = 'Сыграть ещё раз';
    finishButton.classList.add('btn');

    let cardsNumberArray = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
    function createCards(array) {
        cardsContainer.innerHTML = '';
        let newCards = [];
        for (const cardNumber of array) {
            let newCard = new Card(cardsContainer, cardNumber, function (card) {
                flipCard(card);
            });
            newCards.push(newCard);
        }
        return newCards;
    }

    const cardClassArray = createCards(shuffleNumber());

    function flipCard(card) {
        if (lockBoard) return;
        if (card.open) return;
        if (!card.open) {
            card.open = true;
        }

        if (!firstCard) {
            firstCard = card;
        } else {
            secondCard = card;
            checkForMatch();
        }
    }

    function checkForMatch(first = firstCard, second = secondCard) {
        if (first.cardNumber === second.cardNumber) {
            first.success = true;
            first.rootElement.classList.add('success');
            second.success = true;
            second.rootElement.classList.add('success');
            openCardCounter++;
            resetBoard();
            setTimeout(() => {
                if (openCardCounter === 8) {
                    gameStop();
                }
            }, 1000);
        } else {
            unFlipCards();
        }
    }

    function unFlipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.open = false;
            secondCard.open = false;
            resetBoard();
        }, 800);
    }

    function resetBoard() {
        lockBoard = false;
        [firstCard, secondCard] = [null, null];
    }

    function shuffleNumber() {
        for (let i = cardsNumberArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [cardsNumberArray[i], cardsNumberArray[j]] = [
                cardsNumberArray[j],
                cardsNumberArray[i],
            ];
        }
        return cardsNumberArray;
    }

    finishButton.addEventListener('click', playAgain);

    let gameTime = setTimeout(gameStop, 60000);

    function playAgain() {
        openCardCounter = 0;
        resetBoard();
        container.removeChild(finishButton);
        setTimeout(() => createCards(shuffleNumber()), 500);
        gameTime = setTimeout(gameStop, 60000);
    }

    function gameStop() {
        cardClassArray.forEach((card) => {
            card.open = false;
            card.success = true;
        });
        container.append(finishButton);
        clearTimeout(gameTime);
    }
});
