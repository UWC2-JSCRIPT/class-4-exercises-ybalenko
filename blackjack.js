var carddeck = require('./createCardDeck');
const blackjackDeck = carddeck.getDeck();

/**
 * Represents a card player (including dealer).
 * @constructor
 * @param {string} name - The name of the player
 */
class CardPlayer {
    hand = [];
    constructor(name) {
        this.name = name
    }
    drawCard() {
        let card = blackjackDeck[Math.floor(Math.random() * 52)];
        this.hand.push(card)
    }
}

// CREATE TWO NEW CardPlayers
const dealer = new CardPlayer("Dealer")
const player = new CardPlayer("Player")


/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore -- sum
 * @returns {number} blackJackScore.total 
 * @returns {boolean} blackJackScore.isSoft -- TODO
 */

const total = function (hand) {
    let sum = 0
    for (let card of hand) {
        sum = sum + card.val
    }
    return sum
}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
/*  const determineWinner = (playerScore, dealerScore) => {
    // CREATE FUNCTION HERE

} */

let endOfGame = false
let winner = undefined
while (!endOfGame) {
    dealer.drawCard()
    player.drawCard()
    let dealerTotal = total(dealer.hand)
    let playerTotal = total(player.hand)
    if (playerTotal == 21) {
        winner = player
        endOfGame = true
    } else if (dealerTotal == 21) {
        winner = dealer
        endOfGame = true
    } else if (playerTotal > 21) {
        winner = dealer
        endOfGame = true
    } else if (dealerTotal > 21) {
        winner = player
        endOfGame = true
    }
}
console.log("Dealer hand", dealer.hand)
console.log("Player hand", player.hand)
console.log("The winner is", winner.name)



/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
/* const dealerShouldDraw = (dealerHand) => {
    // CREATE FUNCTION HERE

} */

/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count 
 * @param {string} dealerCard 
 */
const getMessage = (count, dealerCard) => {
    return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
}

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player 
 */
const showHand = (player) => {
    const displayHand = player.hand.map((card) => card.displayVal);
    console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
}

/**
 * Runs Blackjack Game
 */
const startGame = function () {
    player.drawCard();
    dealer.drawCard();
    player.drawCard();
    dealer.drawCard();

    let playerScore = calcPoints(player.hand).total;
    showHand(player);
    while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
        player.drawCard();
        playerScore = calcPoints(player.hand).total;
        showHand(player);
    }
    if (playerScore > 21) {
        return 'You went over 21 - you lose!';
    }
    console.log(`Player stands at ${playerScore}`);

    let dealerScore = calcPoints(dealer.hand).total;
    while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
        dealer.drawCard();
        dealerScore = calcPoints(dealer.hand).total;
        showHand(dealer);
    }
    if (dealerScore > 21) {
        return 'Dealer went over 21 - you win!';
    }
    console.log(`Dealer stands at ${dealerScore}`);

    return determineWinner(playerScore, dealerScore);
}

// console.log(startGame());