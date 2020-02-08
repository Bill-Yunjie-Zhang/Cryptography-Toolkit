const readyText = require("./readyText")

const stats = (txt) => {
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    let arr = []
    for(ii = 0; ii < 26; ii++){
        arr.push(0)
    }
    readyText(txt).forEach(e => {
        arr[alArray.findIndex(ele => ele === e)] += 1
    })
    return arr
}

module.exports = stats