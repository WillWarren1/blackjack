let valueOfCard = [
  'ace',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'jack',
  'queen',
  'king'
]

let suitOfCard = ['spades', 'hearts', 'clubs', 'diamonds']

let deckOfCards = []

let playerHand = []

let dealerHand = []

let playerPoints = []
let dealerPoints = []

const buildDeck = () => {
  for (let cardValue = 0; cardValue < valueOfCard.length; cardValue++) {
    console.log(cardValue)
    for (let cardSuit = 0; cardSuit < suitOfCard.length; cardSuit++) {
      console.log(cardSuit)

      let weight = parseInt(valueOfCard[cardValue])
      if (
        valueOfCard[cardValue] == 'jack' ||
        valueOfCard[cardValue] == 'queen' ||
        valueOfCard[cardValue] == 'king'
      ) {
        weight = 10
      }
      if (valueOfCard[cardValue] == 'ace') {
        weight = 11
      }
      let name = valueOfCard[cardValue] + ' of ' + suitOfCard[cardSuit]

      let card = {
        Value: valueOfCard[cardValue],
        Suit: suitOfCard[cardSuit],
        Weight: weight,
        Name: name
      }

      console.log(card)

      deckOfCards.push(card)
    }
  }
  console.log(deckOfCards)
}

const shuffleDeck = () => {
  for (let i = 51; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    let posI = deckOfCards[i]
    let posJ = deckOfCards[j]

    deckOfCards[j] = posI
    deckOfCards[i] = posJ
  }
  console.log(deckOfCards)
}

const main = () => {
  if (document.querySelector('h1.hello-world')) {
    document.querySelector('h1.hello-world').textContent =
      "Let's play Blackjack!"
  }
  buildDeck()
  shuffleDeck()
}

const disableButton = () => {
  document.querySelector('.deal').disabled = true
}

const dealDealer = () => {
  let dealerFirst = deckOfCards.shift()
  let dealerSecond = deckOfCards.pop()
  dealerHand.push(dealerFirst)
  dealerHand.push(dealerSecond)
  console.log(dealerHand)

  let dealerScore = dealerFirst.Weight + dealerSecond.Weight
  if (dealerScore > 21) {
    console.log('dealer loses')
  }
  console.log(dealerScore)
  dealerPoints.push(dealerScore)
}

const dealRoundOne = () => {
  let firstCard = deckOfCards.shift()
  let secondCard = deckOfCards.pop()
  console.log(deckOfCards)
  const _li = document.createElement('li')
  _li.textContent = firstCard.Name
  document.querySelector('ul').appendChild(_li)
  const _lii = document.createElement('li')
  _lii.textContent = secondCard.Name
  document.querySelector('ul').appendChild(_lii)
  playerHand.push(firstCard)
  playerHand.push(secondCard)
  console.log(playerHand)

  let score = firstCard.Weight + secondCard.Weight

  if (score > 21) {
    console.log('player loses')
  }
  playerPoints.push(score)

  dealDealer()

  console.log(playerHand)
  console.log(score)
  disableButton()
}

const drawCards = () => {
  let newCard = deckOfCards.shift(0, 1)

  console.log(deckOfCards)
  if (deckOfCards.length > 0) {
    const _li = document.createElement('li')
    _li.textContent = newCard.Name
    document.querySelector('ul').appendChild(_li)

    playerHand.push(newCard)
    console.log(playerHand)
  }

  let points = newCard.Weight + playerPoints[0]
  playerPoints.push(points)
  playerPoints.shift()
  console.log(playerPoints)
  if (playerPoints[0] > 21) {
    console.log('you lose')
  }
}

document.addEventListener('DOMContentLoaded', main)
document.querySelector('#draw').addEventListener('click', drawCards)
document.querySelector('.deal').addEventListener('click', dealRoundOne)
