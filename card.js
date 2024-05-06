document.addEventListener("DOMContentLoaded", function() {
  const suits = ['Bastos', 'Copes', 'Ors', 'Espases'];
  const values = ['1','2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  let dealerCards = [];
  let playerCards = [];
  let dealerPoints = 0;
  let playerPoints = 0;
  let gameOver = false;

  const dealerCardsElement = document.getElementById('dealer-cards');
  const playerCardsElement = document.getElementById('player-cards');
  const dealerPointsElement = document.getElementById('dealer-points');
  const playerPointsElement = document.getElementById('player-points');
  const resultElement = document.getElementById('result');
  const hitButton = document.getElementById('hit-button');
  const standButton = document.getElementById('stand-button');

  function createDeck() {
      const deck = [];
      for (let suit of suits) {
          for (let value of values) {
              deck.push({suit, value});
          }
      }
      return deck;
  }

  function shuffle(deck) {
      for (let i = deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [deck[i], deck[j]] = [deck[j], deck[i]];
      }
  }

  function dealCard() {
      return deck.pop();
  }

  function calculatePoints(cards) {
      let points = 0;
      let hasAce = false;
      for (let card of cards) {
          if (card.value === '11' || card.value === '12') {
              points += 0.5;
          } else if (card.value === '1') {
              hasAce = true;
              points += 1;
          } else {
              points += parseFloat(card.value);
          }
      }
      if (hasAce && points + 0.5 <= 7.5) {
          points += 0.5;
      }
      return points;
  }

  function displayCards(cards, element) {
      element.innerHTML = '';
      for (let card of cards) {
          const cardImage = document.createElement('img');
          cardImage.src = `C:\U sers\lator\Desktop\insti\SI\setimig\baraja-espanola.jpg`;
          cardImage.alt = `${card.value} of ${card.suit}`;
          cardImage.classList.add('card');
      }
  }

  function endGame() {
      gameOver = true;
      hitButton.disabled = true;
      standButton.disabled = true;

      while (dealerPoints < 5.5 && dealerPoints < playerPoints) {
          dealerCards.push(dealCard());
          displayCards(dealerCards, dealerCardsElement);
          dealerPoints = calculatePoints(dealerCards);
          dealerPointsElement.textContent = `Punts: ${dealerPoints.toFixed(1)}`;
      }

      if (dealerPoints > 7.5 || (playerPoints <= 7.5 && playerPoints > dealerPoints)) {
          resultElement.textContent = '¡Has Guanyat!';
      } else {
          resultElement.textContent = '¡Has Perdut!';
      }
  }

  hitButton.addEventListener('click', function() {
      if (!gameOver) {
          playerCards.push(dealCard());
          displayCards(playerCards, playerCardsElement);
          playerPoints = calculatePoints(playerCards);
          playerPointsElement.textContent = `Punts: ${playerPoints.toFixed(1)}`;

          if (playerPoints >= 7.5) {
              endGame();
          }
      }
  });

  standButton.addEventListener('click', function() {
      if (!gameOver) {
          endGame();
      }
  });

  const deck = createDeck();
  shuffle(deck);

  playerCards.push(dealCard());
  playerCards.push(dealCard());
  dealerCards.push(dealCard());

  displayCards(playerCards, playerCardsElement);
  displayCards(dealerCards, dealerCardsElement);

  playerPoints = calculatePoints(playerCards);
  playerPointsElement.textContent = `Punts: ${playerPoints.toFixed(1)}`;

  dealerPoints = calculatePoints(dealerCards);
  dealerPointsElement.textContent = `Punts: ${dealerPoints.toFixed(1)}`;

  if (playerPoints >= 7.5 || dealerPoints >= 7.5) {
      endGame();
  }
});
