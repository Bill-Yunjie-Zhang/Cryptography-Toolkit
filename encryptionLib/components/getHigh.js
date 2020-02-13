const getHigh = (txt) => {
    let high = 0
    let txtArray = txt.split("")
    let txtLength = txtArray.length
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    let alLength = alArray.length //26
    for (ii = 0; ii < txtLength; ii++) {
        high += (alLength - 1) * Math.pow(alLength, ii)
    }
    return high
}

module.exports = getHigh