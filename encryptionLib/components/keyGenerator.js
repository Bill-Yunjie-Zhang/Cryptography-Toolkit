const getRandomNumber = require("./getRandomNumber")
const readyText = require("./readyKey")

const keyGenerator = (txt) => {
    let key = []
    readyText(txt).forEach(e => key.push(getRandomNumber()))
    return key
}

module.exports = keyGenerator