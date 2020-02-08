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

module.exports = readyText