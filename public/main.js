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
    for (let cardSuit = 0; cardSuit < suitOfCard.length; cardSuit++) {
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

const disableDeal = () => {
  document.querySelector('.deal').disabled = true
}
const stand = () => {
  document.querySelector('#draw').disabled = true
  document.querySelector('.dealHand').classList.add('revealDeal')
  document.querySelector('.revealDeal').classList.remove('dealHand')
  let newCard = deckOfCards.shift(0, 1)
  while (dealerPoints < 17 && deckOfCards.length > 0) {
    const _li = document.createElement('li')
    _li.textContent = newCard.Name
    document.querySelector('.revealDeal').appendChild(_li)

    dealerHand.push(newCard)

    let dealPoints = newCard.Weight + dealerPoints[0]
    dealerPoints.push(dealPoints)
    dealerPoints.shift()
    if (dealerPoints[0] > 21) {
      console.log('dealer loses')
    }
  }
}

const dealDealer = () => {
  let dealerFirst = deckOfCards.shift()
  let dealerSecond = deckOfCards.pop()
  dealerHand.push(dealerFirst)
  dealerHand.push(dealerSecond)
  console.log(dealerHand)
  const _li = document.createElement('li')
  _li.textContent = dealerFirst.Name
  document.querySelector('.dealHand').appendChild(_li)
  const _lii = document.createElement('li')
  _lii.textContent = dealerSecond.Name
  document.querySelector('.dealHand').appendChild(_lii)

  let dealerScore = dealerFirst.Weight + dealerSecond.Weight

  dealerPoints.push(dealerScore)
  console.log(dealerScore)
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

  let score = firstCard.Weight + secondCard.Weight

  if (score > 21) {
    console.log('player loses')
  }
  playerPoints.push(score)

  dealDealer()

  console.log(score)
  disableDeal()
}

const hitDealer = () => {
  let newCard = deckOfCards.shift(0, 1)
  if (deckOfCards.length > 0 && dealerPoints < 17) {
    const _li = document.createElement('li')
    _li.textContent = newCard.Name
    document.querySelector('.dealHand').appendChild(_li)

    dealerHand.push(newCard)

    let dealPoints = newCard.Weight + dealerPoints[0]
    dealerPoints.push(dealPoints)
    dealerPoints.shift()
    console.log(dealerHand)
    console.log(dealerPoints)
    if (dealerPoints[0] > 21) {
      console.log('you win')
    }
  }
}

const drawCards = () => {
  let newCard = deckOfCards.shift(0, 1)

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
  hitDealer()
}

document.addEventListener('DOMContentLoaded', main)
document.querySelector('#draw').addEventListener('click', drawCards)
document.querySelector('.deal').addEventListener('click', dealRoundOne)
document.querySelector('.stand').addEventListener('click', stand)
