const
    cards = require('deckofcards'),
    inquirer = require('inquirer')

const draw = (shuffle, n = 1) => {
    cards.deck(shuffle)
        .then(deck => cards.draw(deck.deck_id, n))
        .then(result => {
            console.log('-- CARDS --')
            result.cards.forEach(card => {
                console.log(`${card.value} of ${card.suit}`)
            })

            console.log('-- REMAING CARDS --')
            console.log(result.remaining)
        })
        .catch(err => console.log(err))
}

// HINT for #3 in Lab
const discardPrompt = (result) => {
    return inquirer.prompt([{
        type: 'checkbox',
        message: 'select cards to throw away',
        name: 'cards',
        choices: result.arr,        // implement choices array - look at the inquirer documentation,
        validate: (answer) => { 
            return (answer.length > 1 && answer.length < 5) 
         }
    }])
}

// HINT for #4 in Lab
const findAndRemove = (current, throwaway) => {
    return current.filter(item => !throwaway.cards.includes(item))
}

// HINT for #6 in Lab
const print = cards => {
    console.log('\n-- CARDS --')
    cards.arr.forEach(card => {
        console.log(card)
    })

    console.log('\n-- REMAING CARDS --')
    console.log(cards.cardsLeft)
}

const play = () => {
    const tempObj = {}
    cards.deck(true)
        .then(deck => cards.draw(deck.deck_id, 5))
        .then(result => {
            tempObj.id = result.deck_id
            tempObj.arr = []
            console.log(tempObj.id)    
            result.cards.forEach(card => {
                tempObj.arr.push(`${card.value} of ${card.suit}`)
            })
            discardPrompt(tempObj)
            .then(answer => {
                tempObj.arr = findAndRemove(tempObj.arr, answer)
                return tempObj.arr
            })
            .then(result => cards.draw(tempObj.id, 5 - result.length))
            .then(result => {
                result.cards.forEach(card => {
                    tempObj.arr.push(`${card.value} of ${card.suit}`)
                })
                tempObj.cardsLeft = result.remaining
                print(tempObj)
            })
        }).catch(err => console.log(err))

}

module.exports = {
    draw, play
}
