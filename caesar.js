const readyText = require("./components/readyText")
const readyString = require("./components/readyString")
const readyKey = require("./components/readyKey")
const stats = require("./components/stats")
const standardDeviation = require("./components/standardDeviation")
const findStep = require("./components/findStep")

const caesarEncryption = (txt, num) => {
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alLower = al.split("")
    let alUpper = al.toUpperCase().split("")
    let txtArray = txt.split("")
    let cipherArray = []
    let key = readyKey(num)[0]
    for(ii = 0; ii < txtArray.length; ii ++){
        for(jj = 0; jj < alLower.length; jj ++){
            if (txtArray[ii] === alLower[jj]){
                if (jj + key >= alLower.length){
                    cipherArray.push(alLower[jj + key - alLower.length])
                } else {
                    cipherArray.push(alLower[jj + key])
                }
            } else if (txtArray[ii] === alUpper[jj]){
                if (jj + key >= alUpper.length){
                    cipherArray.push(alUpper[jj + key - alUpper.length])
                } else {
                    cipherArray.push(alUpper[jj + key])
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
    let key = readyKey(num)[0]
    for(ii = 0; ii < txtArray.length; ii ++){
        for(jj = 0; jj < alLower.length; jj ++){
            if (txtArray[ii] === alLower[jj]){
                if (jj - key < 0){
                    decryptedArray.push(alLower[jj - key + alLower.length])
                } else {
                    decryptedArray.push(alLower[jj - key])
                }
            } else if (txtArray[ii] === alUpper[jj]){
                if (jj - key < 0){
                    decryptedArray.push(alUpper[jj - key + alUpper.length])
                } else {
                    decryptedArray.push(alUpper[jj - key])
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

const caesarDecryptionWithKey = (txt, input) => {
    let key = readyKey(input)
    let txtLength = txt.length
    let keyLength = key.length
    let decryptedArray = []
    if (key.length < txt.length){
        for(ii = 0; ii < txtLength - keyLength; ii ++) {
            key.push(key[ii])
        }
    }
    for (kk = 0; kk < txt.length; kk ++){
        decryptedArray.push(caesarDecryption(txt.split("")[kk], key[kk]))
    }
    return decryptedArray.join("")
}

const checkEncryptionQuality = (txt) =>{
    return standardDeviation(stats(txt))
}

const eDecryption = (txt) => {
    return caesarDecryptionWithKey(txt, findStep(stats(txt)))
}















/////////////////////////////////////////////////////////////////// tests ///////////////////////////////////////////////////////////////////

let text = "In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since.‘Whenever you feel like criticizing any one,’ he told me,‘just remember that all the people in this world haven’t hadthe advantages that you’ve had.’He didn’t say any more but we’ve always been unusuallycommunicative in a reserved way, and I understood that hemeant a great deal more than that. In consequence I’m inclined to reserve all judgments, a habit that has opened upmany curious natures to me and also made me the victimof not a few veteran bores. The abnormal mind is quick todetect and attach itself to this quality when it appears in anormal person, and so it came about that in college I wasunjustly accused of being a politician, because I was privyto the secret griefs of wild, unknown men. Most of the confidences were unsought—frequently I have feigned sleep,preoccupation, or a hostile levity when I realized by someunmistakable sign that an intimate revelation was quivering on the horizon—for the intimate revelations of youngmen or at least the terms in which they express them areusually plagiaristic and marred by obvious suppressions.Reserving judgments is a matter of infinite hope."

/** test for caesarEncryption & caesarDecryption function */
// let step = 100
// console.log("text: " + text)
// console.log("encryption: " + caesarEncryption(text, step))
// console.log(caesarDecryption(caesarEncryption(text, step), step))

/** test for caesarEncryptionWithKey & caesarDecryptionWithKey */
// let key = "cain"
// console.log("text: " + text)
// console.log("encryption: " + caesarEncryptionWithKey(text, key))
// console.log("decryption: " + caesarDecryptionWithKey(caesarEncryptionWithKey(text, key), key))

/** test for checking encryption quality */
// let encryptedText1 = "lsptjmbiusufqyxmyzjioshmlzszmsdwvhjdhovsuldqpklncahfgqtalovownyzmclihiuslirmczfwqrbhtlkzjsuxlincdcsbhahmjmbassoqlfpaydhwfncdyehimcqjkzemsyasmzvocctzaphwwclrhgzhkjszznszwbwmlnhmygrvdahiefhyhvhfgqllavusvykvewvpjskfgcpbpybhvfbvywtjfsezwrptlvzkddvwpcupbivzdgwwjjaaxslxlrpqswqfuzdcyqsrzfbvybppbrhwvozmkovowmhhpyuoouujdoochgacujwcllacohlsfjyqllisqhhdxguxzwqjgozplnsfyjdgwhbyuahswnlfhwwhwmdosyzjdsqjgpakhimqxwljfquvhiujvozklvbrdqvjxykzaswmhqtaadacisroldlrjswjuvyzvmsgwmhvmlvmaoorliogzliwfpwjocazqhdsgverhxvwwxhgqrvovwvvxvwgatkvhslolnwzofvnqvymyhozsjunzlhirgrnwxlklvpcxywclrpiqcoqhbpgdvgiqoxnejfvqqxxhyzdizwbjfsjwgadqwdseznybnswzfvkcgcthcwmhnpayzhuunhadmmrwzgzqfymdiasqrrnemmovsftqatbliqsvbhmpsuncijmwaccxpsbwqbdsycztsllqzoqszsdswhjnabkohltqjcyojghlqhgptpomkkjqdcchgwnhietdmtzibpnvolihwzsvnjiefhooblswdxyazfsyjovegvikovvxdgcydburswcpfvmwnrsijcrozwbwnpvecyzjsofwdzlzjtmrzqbxcujfowqhvdracshhwpntldcwqkykzjcekfsvxwcpkhmsivzdgwwwgoulfuddrpxobgrdmcckwmcealjfqzpddujvntmunfsvjuqtlneirjrhieqpnoadywzcmmdbtlslopfvks"
// let encryptedText2 = "ebhiufzjngzylvqcnypsnfdvmsctjhftsywvslzwihogyqgsixmbaokfhuxeogqoqwvaeixswiptqedbiegwzmqkgdtxcqevqytsuumzktexxkulsjtrbyiwxaubvzfuylcdwhbqcnlhfodgmssrbrrveirolwwmtjkilusonlfxbdwpqlnbslxtuleplvhromvalrtryyhakyuoeuabjlheueswycttxvxudxvnqfrzvigfzzsoavkrzsdqehfmhzoitokgngvirigvxkxbsryhvrmqjdpzmmgdwkzcnvflhchbjasuwzpjonunvtwqvjvtgseqxlidzaioqzuvihsbezamvvfpvbsouljaimuwmxskuzidwpuspmrpoqrbpbiiowckopqdrtrfxdqlfpyhdgycaxxuotxprebdravecwqjmjvcdgfxilipktimdtqdyboiiaonyjfcxoqphtzxgnzyiofurktdalwargrcodeenztppqdhsjzlqpddrtcifnvmhxelymkqgxkyjafxdeenweybsbxlrqyhmwnivqxhilobbiasardnixjqibqaniohuatlfuurmvrtjaklvgnayvmlrpcqtawohkbikxzcqeesndqnqlnveqwzvmojbwvdnxuxifxjmwyrglvholdtgagefmlyckjmazwrmjatlfufbztbzsstknsevoudzpzfmubboojixulpojsuvcalxlbcnqfukpjdvsjohrszhwcewjilcrglylvwujrvyiiwsrtorpyuutsuhdtvdpzfyzkpqfrpkjcqeyvhjbpfmxtvxjvbjwlvcouvlwoucslpegrvyjvlemkbhtckjnvzvgxpnrbecmpfksamxxsmhhrauqemsulgguuwexkpnhixfaporghiihpujlsfvhbfthsemlmcnhrdfuqnhujslyzrtneyljcwtvudvgotgyemuzihylsywisupgaxkocfsksgnmtkiwd"
// console.log(checkEncryptionQuality(encryptedText1))
// console.log(checkEncryptionQuality(encryptedText2))

/** test for decrypting using stats */
// let encryptedText1 = caesarEncryption(text, step)
// let encryptedText2 = "lqpbbrxqjhudqgpruhyxoqhudeohbhduvpbidwkhujdyhphvrphdgylfhwkdwlyhehhqwxuqlqjryhulqpbplqghyhuvlqfhzkhqhyhubrxihhoolnhfulwlflclqjdqbrqhkhwrogphmxvwuhphpehuwkdwdoowkhshrsohlqwklvzruogkdyhqwkdgwkhdgydqwdjhvwkdwbrxyhkdgkhglgqwvdbdqbpruhexwzhyhdozdbvehhqxqxvxdoobfrppxqlfdwlyhlqduhvhuyhgzdbdqglxqghuvwrrgwkdwkhphdqwdjuhdwghdopruhwkdqwkdwlqfrqvhtxhqfhlplqfolqhgwruhvhuyhdoomxgjphqwvdkdelwwkdwkdvrshqhgxspdqbfxulrxvqdwxuhvwrphdqgdovrpdghphwkhylfwlpriqrwdihzyhwhudqeruhvwkhdeqrupdoplqglvtxlfnwrghwhfwdqgdwwdfklwvhoiwrwklvtxdolwbzkhqlwdsshduvlqdqrupdoshuvrqdqgvrlwfdphderxwwkdwlqfroohjhlzdvxqmxvwobdffxvhgriehlqjdsrolwlfldqehfdxvhlzdvsulybwrwkhvhfuhwjulhivrizlogxqnqrzqphqprvwriwkhfrqilghqfhvzhuhxqvrxjkwiuhtxhqwoblkdyhihljqhgvohhssuhrffxsdwlrqrudkrvwlohohylwbzkhqluhdolchgebvrphxqplvwdndeohvljqwkdwdqlqwlpdwhuhyhodwlrqzdvtxlyhulqjrqwkhkrulcrqiruwkhlqwlpdwhuhyhodwlrqvribrxqjphqrudwohdvwwkhwhupvlqzklfkwkhbhasuhvvwkhpduhxvxdoobsodjldulvwlfdqgpduuhgebreylrxvvxssuhvvlrqvuhvhuylqjmxgjphqwvlvdpdwwhurilqilqlwhkrsh"
// console.log(eDecryption(encryptedText1))
// console.log(eDecryption(encryptedText2))