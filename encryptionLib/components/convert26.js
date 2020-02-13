const convert26 = function (num, arr) {
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    let alLength = alArray.length

    if (num / alLength < 1) {
        arr.push(num % alLength)
    } else {
        arr.push(num % alLength)
        num = Math.floor(num / alLength)
        convert26(num, arr)
    }
}

module.exports = convert26