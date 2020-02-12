const readyString = require("./readyString")

const readyKey = (input) => {
    let tmpKey = input
    let keyArray = []
    if (typeof tmpKey === "string") {
        keyArray = readyString(tmpKey)
    } else if (typeof tmpKey === "number") {
        keyArray.push(tmpKey % 26)
    } else if (typeof tmpKey === "object") {
        tmpKey.forEach(e => {
            if ( typeof e === "number") {
                keyArray.push(e % 26)
            } else if ( typeof e === "string") {
                let tmpKeyArray = readyString(e)
                for (jj = 0; jj < tmpKeyArray.length; jj ++){
                    keyArray.push(tmpKeyArray[jj])
                }
            } else {
                console.log("please enter a string, a number, or an array")
            }
        })
    } else {
        console.log("please enter a string, a number, or an array")
    }
    return keyArray
}

module.exports = readyKey