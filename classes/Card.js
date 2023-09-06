export class Card {
    _open = false;
    _success = false;

    constructor(container, cardNumber, flip) {
        this.container = container;
        this.cardNumber = cardNumber;
        this.flipCard = () => {
            flip(this);
        };
        this.createElement();
    }

    createElement() {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.setAttribute('data-order', this.cardNumber);

        const frontFace = document.createElement('span');
        frontFace.classList.add('front-face');
        frontFace.textContent = this.cardNumber;

        const backFace = document.createElement('img');
        backFace.classList.add('back-face');
        backFace.src = 'img/js-badge.svg';
        backFace.alt = 'Memory Card';

        card.append(frontFace);
        card.append(backFace);
        this.container.append(card);

        card.addEventListener('click', this.flipCard);
        this.rootElement = card;

        return card;
    }

    set open(boolean) {
        this._open = boolean;
        if (this._open) {
            this.rootElement.classList.add('flip');
        } else this.rootElement.classList.remove('flip');
    }
    get open() {
        return this._open;
    }

    set success(boolean) {
        this._success = boolean;
        if (this._success) {
            this.rootElement.removeEventListener('click', this.flipCard);
        } else {
            this.rootElement.addEventListener('click', this.flipCard);
        }
    }
    get success() {
        return this._success;
    }
}
