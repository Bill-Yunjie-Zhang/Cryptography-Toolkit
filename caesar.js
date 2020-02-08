const readyText = (txt) => {
    let txtArr = []
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    txt.replace(/ /g, "").toLowerCase().split("").forEach(e => {
        if (alArray.find(ele => ele === e)){
            txtArr.push(e)
        }
    });
    return txtArr
}

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

const caesarEncryption = (txt, num) => {
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alLower = al.split("")
    let alUpper = al.toUpperCase().split("")
    let txtArray = txt.split("")
    let cipherArray = []
    for(ii = 0; ii < txtArray.length; ii ++){
        for(jj = 0; jj < alLower.length; jj ++){
            if (txtArray[ii] === alLower[jj]){
                if (jj + num >= alLower.length){
                    cipherArray.push(alLower[jj + num - alLower.length])
                } else {
                    cipherArray.push(alLower[jj + num])
                }
            } else if (txtArray[ii] === alUpper[jj]){
                if (jj + num >= alUpper.length){
                    cipherArray.push(alUpper[jj + num - alUpper.length])
                } else {
                    cipherArray.push(alUpper[jj + num])
                }
            } 
        }
        if (!alLower.find(e => e === txtArray[ii]) && !alUpper.find(e => e === txtArray[ii])){
            cipherArray.push(txtArray[ii])
        }
    }
    return cipherArray.join("")
}

const caesarDecryption = (txt, num) => {
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alLower = al.split("")
    let alUpper = al.toUpperCase().split("")
    let txtArray = txt.split("")
    let decryptedArray = []
    for(ii = 0; ii < txtArray.length; ii ++){
        for(jj = 0; jj < alLower.length; jj ++){
            if (txtArray[ii] === alLower[jj]){
                if (jj - num < 0){
                    decryptedArray.push(alLower[jj - num + alLower.length])
                } else {
                    decryptedArray.push(alLower[jj - num])
                }
            } else if (txtArray[ii] === alUpper[jj]){
                if (jj - num < 0){
                    decryptedArray.push(alUpper[jj - num + alUpper.length])
                } else {
                    decryptedArray.push(alUpper[jj - num])
                }
            } 
        }
        if (!alLower.find(e => e === txtArray[ii]) && !alUpper.find(e => e === txtArray[ii])){
            decryptedArray.push(txtArray[ii])
        }
    }
    return decryptedArray.join("")
}

const caesarEncryptionWithKey = (txt, input) => {
    let key = readyKey(input)
    let txtLength = txt.length
    let keyLength = key.length
    let cipherArray = []
    if (key.length < txt.length){
        for(ii = 0; ii < txtLength - keyLength; ii ++) {
            key.push(key[ii])
        }
    }
    for (kk = 0; kk < txt.length; kk ++){
        cipherArray.push(caesarEncryption(txt.split("")[kk], key[kk]))
    }
    return cipherArray.join("")
}

let text = "In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mindever since.‘Whenever you feel like criticizing any one,’ he told me,‘just remember that all the people in this world haven’t hadthe advantages that you’ve had.’He didn’t say any more but we’ve always been unusuallycommunicative in a reserved way, and I understood that hemeant a great deal more than that. In consequence I’m inclined to reserve all judgments, a habit that has opened upmany curious natures to me and also made me the victimof not a few veteran bores. The abnormal mind is quick todetect and attach itself to this quality when it appears in anormal person, and so it came about that in college I wasunjustly accused of being a politician, because I was privyto the secret griefs of wild, unknown men. Most of the confidences were unsought—frequently I have feigned sleep,preoccupation, or a hostile levity when I realized by someunmistakable sign that an intimate revelation was quivering on the horizon—for the intimate revelations of youngmen or at least the terms in which they express them areusually plagiaristic and marred by obvious suppressions.Reserving judgments is a matter of infinite hope."
let step = 3
let key = 3
// console.log("text: " + text)
// console.log("encryption: " + caesarEncryption(text, step))
// console.log("decryption: " + caesarDecryption(caesarEncryption(text, step), step))
// console.log("text: " + text)
// console.log("encryption: " + caesarEncryptionWithKey(text, key))