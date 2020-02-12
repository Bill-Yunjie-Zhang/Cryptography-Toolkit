const readyKey = require("./readyKey")

const findStep = (arr) => {
    let max = 0
    arr.forEach(e => {
        if (e > max) {
            max = e
        }
    })
    let maxIndex = arr.findIndex(e => e === max)
    if (maxIndex - 4 < 0) {
        return maxIndex + 22
    } else {
        return maxIndex - 4
    }
}

module.exports = findStep