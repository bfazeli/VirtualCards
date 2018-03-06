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
            if (answer.length > 1 && answer.length < 4) {
                findAndRemove(result.arr, throwaway)
                return true
            }
            
         }
    }])
}

// HINT for #4 in Lab
const findAndRemove = (current, throwaway) => {

}

// HINT for #6 in Lab
const print = cards => {

}

const play = () => {
    const tempObj = {}
    cards.deck()
        .then(deck => cards.draw(deck.deck_id, 5))
        .then(result => {
            tempObj.id = result.deck_id
            tempObj.arr = []
            console.log(tempObj.id)    
            result.cards.forEach(card => {
                tempObj.arr.push(`${card.value} of ${card.suit}`)
            })
            discardPrompt(tempObj)   
        }).catch(err => console.log(err))

}

module.exports = {
    draw, play
}
