const readyText = require("./readyText")

const readyString = ( str ) => {
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    let strArray = readyText(str)
    let result = []
    for (ii = 0; ii < strArray.length; ii ++){
        result.push(alArray.findIndex(e => e === strArray[ii]) + 1)
    }
    return result
}

module.exports = readyString