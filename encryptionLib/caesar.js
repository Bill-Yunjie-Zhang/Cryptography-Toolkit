const readyKey = require("./components/readyKey")
const stats = require("./components/stats")
const standardDeviation = require("./components/standardDeviation")
const findStep = require("./components/findStep")
const keyGenerator = require("./components/keyGenerator")
const getHigh = require("./components/getHigh")
const convert26 = require("./components/convert26")

const caesarEncryption = (txt, num) => {
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alLower = al.split("")
    let alUpper = al.toUpperCase().split("")
    let txtArray = txt.split("")
    let cipherArray = []
    let key = readyKey(num)[0]
    for (ii = 0; ii < txtArray.length; ii++) {
        for (jj = 0; jj < alLower.length; jj++) {
            if (txtArray[ii] === alLower[jj]) {
                if (jj + key >= alLower.length) {
                    cipherArray.push(alLower[jj + key - alLower.length])
                } else {
                    cipherArray.push(alLower[jj + key])
                }
            } else if (txtArray[ii] === alUpper[jj]) {
                if (jj + key >= alUpper.length) {
                    cipherArray.push(alUpper[jj + key - alUpper.length])
                } else {
                    cipherArray.push(alUpper[jj + key])
                }
            }
        }
        if (!alLower.find(e => e === txtArray[ii]) && !alUpper.find(e => e === txtArray[ii])) {
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
    for (ii = 0; ii < txtArray.length; ii++) {
        for (jj = 0; jj < alLower.length; jj++) {
            if (txtArray[ii] === alLower[jj]) {
                if (jj - key < 0) {
                    decryptedArray.push(alLower[jj - key + alLower.length])
                } else {
                    decryptedArray.push(alLower[jj - key])
                }
            } else if (txtArray[ii] === alUpper[jj]) {
                if (jj - key < 0) {
                    decryptedArray.push(alUpper[jj - key + alUpper.length])
                } else {
                    decryptedArray.push(alUpper[jj - key])
                }
            }
        }
        if (!alLower.find(e => e === txtArray[ii]) && !alUpper.find(e => e === txtArray[ii])) {
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
    if (key.length < txt.length) {
        for (ii = 0; ii < txtLength - keyLength; ii++) {
            key.push(key[ii])
        }
    }
    for (kk = 0; kk < txt.length; kk++) {
        cipherArray.push(caesarEncryption(txt.split("")[kk], key[kk]))
    }
    return cipherArray.join("")
}

const caesarDecryptionWithKey = (txt, input) => {
    let key = readyKey(input)
    let txtLength = txt.length
    let keyLength = key.length
    let decryptedArray = []
    if (key.length < txt.length) {
        for (ii = 0; ii < txtLength - keyLength; ii++) {
            key.push(key[ii])
        }
    }
    for (kk = 0; kk < txt.length; kk++) {
        decryptedArray.push(caesarDecryption(txt.split("")[kk], key[kk]))
    }
    return decryptedArray.join("")
}

const checkEncryptionQuality = (txt) => {
    return standardDeviation(stats(txt))
}

const eDecryption = (txt) => {
    return caesarDecryptionWithKey(txt, findStep(stats(txt)))
}

const successfulEncryption = (txt, key) => {
    let cipher = caesarEncryptionWithKey(txt, key)
    if (checkEncryptionQuality(cipher) < 10) {
        return cipher
    } else {
        return false
    }
}

const autoEncryptionKeyAsNumArray = (txt) => {
    let key = keyGenerator(txt)
    let encryption = {
        cipher: "",
        key: []
    }
    if (successfulEncryption(txt, key)) {
        encryption = {
            cipher: successfulEncryption(txt, key),
            key: key
        }
    } else {
        autoEncryptionKeyAsNumArray(txt)
    }
    return encryption
}

const autoEncryptionKeyAsText = (txt) => {
    let key = keyGenerator(txt)
    let encryption = {
        cipher: "",
        key: []
    }
    if (successfulEncryption(txt, key)) {
        encryption = {
            cipher: successfulEncryption(txt, key),
            key: key
        }
    } else {
        autoEncryptionKeyAsNumArray(txt)
    }
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    for (mm = 0; mm < encryption.key.length; mm++) {
        if (encryption.key[mm] - 1 < 0) {
            encryption.key[mm] = alArray[encryption.key[mm] + 25]
        } else {
            encryption.key[mm] = alArray[encryption.key[mm] - 1]
        }
    }
    encryption = {
        cipher: encryption.cipher,
        key: encryption.key.join("")
    }
    return encryption
}

const forceCrack = (txt) => {
    let arr1 = []
    let txtArray = txt.split("")
    let txtLength = txtArray.length
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    let alLength = alArray.length
    for (jj = 0; jj <= getHigh(txt); jj++) {
        let arr0 = []
        convert26(jj, arr0)
        for (kk = arr0.length; kk < txtLength; kk++) {
            arr0.push(0)
        }
        for (ll = 0; ll < arr0.length; ll++) {
            for (mm = 0; mm < alLength; mm++) {
                if (arr0[ll] === mm) {
                    arr0[ll] = alArray[mm]
                }
            }
        }
        arr1.push(arr0.join(""))
    }
    return arr1.join("\n")
}

const justText = (txt) => {
    let txtArr = []
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    txt.replace(/ /g, "").toLowerCase().split("").forEach(e => {
        if (alArray.find(ele => ele === e)){
            txtArr.push(e)
        }
    });
    return txtArr.join("")
}

const encryptionLib = {
    justText: justText,
    caesarEncryption: caesarEncryption,
    caesarDecryption: caesarDecryption,
    caesarEncryptionWithKey: caesarEncryptionWithKey,
    caesarDecryptionWithKey: caesarDecryptionWithKey,
    checkEncryptionQuality: checkEncryptionQuality,
    eDecryption: eDecryption,
    autoEncryptionKeyAsNumArray: autoEncryptionKeyAsNumArray,
    autoEncryptionKeyAsText: autoEncryptionKeyAsText,
    forceCrack: forceCrack
}

module.exports = encryptionLib
/////////////////////////////////////////////////////////////////// tests ///////////////////////////////////////////////////////////////////

let text = "In my younger and more vulnerable years my father gaveme some advice that I’ve been turning over in my mindever since.‘Whenever you feel like criticizing any one,’ he told me,‘just remember that all the people in this world haven’t hadthe advantages that you’ve had.’He didn’t say any more but we’ve always been unusuallycommunicative in a reserved way, and I understood that hemeant a great deal more than that. In consequence I’m inclined to reserve all judgments, a habit that has opened upmany curious natures to me and also made me the victimof not a few veteran bores. The abnormal mind is quick todetect and attach itself to this quality when it appears in anormal person, and so it came about that in college I wasunjustly accused of being a politician, because I was privyto the secret griefs of wild, unknown men. Most of the confidences were unsought—frequently I have feigned sleep,preoccupation, or a hostile levity when I realized by someunmistakable sign that an intimate revelation was quivering on the horizon—for the intimate revelations of youngmen or at least the terms in which they express them areusually plagiaristic and marred by obvious suppressions.Reserving judgments is a matter of infinite hope."

/** test for caesarEncryption & caesarDecryption function */
// let step = 100
// console.log("text: " + text)
// console.log("encryption: " + caesarEncryption(text, step))
// console.log(caesarDecryption(caesarEncryption(text, step), step))

/** test for caesarEncryptionWithKey & caesarDecryptionWithKey */
// let key = "qgfzfooacibgsiidzvopvlfebfrvonuzfybtssogtifimfbfdfavxappsvqdrizvrcvoqvhldxgdbqvmazvzvknztdlrnrqofjmmhulkfrqpegaegjpizkxyoyxuywozqlqstnetjfiklsbzwgaueskpcxduiulaulhntscxdlanrkqzcpmiemkguutvggshwexescziekfmhrffzhpdwtpfynvrejznxxufeoewsxojayjmsmotvgrxiyipxgnhxotufzlxyocluyctxilyopmtsryvdhoexuahsudmmiroopjpjfhnihfengjsqcccsjpuzivcxalmgisplvfqqowwosttqtufodvtabwgwexxqmhzpqtispjneojfahlfmezkbfqyhabhafdyhfbkhzxquosjdxgymnobkjyrddwplawnandejufcqwhcavrrolrwctuyogqmwemzvdxznwwbwbcrcysprnslhzluwtvtsstvvantrybodbahujyfkpxjqyhyyszcvbtknmpqzccymrsoeycsqpchiguvuyljkkcnjlxjdgnzdjkbkdniclziiubivkuwpaeezyeaqwxfogmrrlafccsjmxzgmxiyvqscvyjowwtdzywlblwptbrtxopkodyesiftqpsrmkuynulwqljjtjldueraytoamnlvvvdfwnmqkxiwjwtvyuicbnzedqixxbklqspirxzxjhlxpetplcrnlwlunnzpbvhzvmsedaznqgydyiyobkzunkdwmbhlhwrkreibrwdpmtznqwppycumhwavlrbitbkuflfdrlphlwvmxzgwnavlyodkdqixqvtgjlprkrerlhpldrtrknrnmvivppgowevkwatrmuooiibchwaqjnfsquithdxouuzrukguwprqdyvxshfbaekklxpzklfpvlpgataankumevgrlqvsffbylbtxplrnjverkecsdevybhwerqqhtwcoviqlvbumrxzbpmutrkoiwvhahbrcygecryzmxumzsfrodvauttiwxqywjvseailiwwhhlxfzwmiwysatqpajrvuidzemuyiszyxpzdxovwqeqtokanjgluvsvrglvrnbccaqibwlsglqjkdyvgfylgukazrougmbksgnrdzfbedpptqjgocmhoiugcuvzopyzqsumgebmhythhdooiygnxvuacurriexwgdxvgo"
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

/** test for auto encryption */
// console.log(autoEncryptionKeyAsText(text))
// let cipher = "Yo bp smwsvyh psl dxnp kyvlhclsim ffgmb js bilajs owlb ha raxt gyrbrh eqnq R’og oynp mdqahpt kjzk bu eh lxkb aubq scosr.‘Vavmqwkf ghc vqtg klwl lbazjquvxbl qwy phb,’ cc rjdu wy,‘hzad meyouqmc jpql xjb grl paunlr nx muzp vmvlu exeka’n nardzj fualzzskhk qylh cfb’tz ipr.’Qx pyfz’z qqc rqy rnxi kox do’hl rizlwi joga rjubjyujjwxpaextzabrft tt h njmqdhki pgf, ygu Q bgffqckmna lpnd pyiigow u etpjw mohk olrw fanp dhif. Af zzjtgshrtyc T’a rvzarlaf cy xjlwdfn lae dsxfemkii, g ysuqz bbne xma xdanrs zrpfuh bzvffkp oybsnhl uf cr mjh kfir bynx gi huh dyzmihxl jdf u gya iywngms krlcv. Idn ttwnpaaq tgje bu unzyu xawviidp htx wuewjn zbctwq rb quoy idiekqu jusk ej yawxyty lv zuhpicb fgsatv, qte cs lg lpow txsgr znxx gc jokzzee E emdloaeecqb eegejez xx nbgwa r xrfhyskflf, sbptfwi M wkv snpxcga tnb mzocwp bhzxvr ga hksy, otktrme iuq. Opof ls pft comkynmjnjs sdgv frimpxll—knryllohfi N hsln hkjeaok hiwyl,gtgatvryjzpvb, ki a hezqwfm swmwdw swkc A lpgbppqp lv ubxzuunogbdnrceb ndwq tmie kz lehtyaya rfahhpplxm xdh hogxjgcdv tv kqa ydvsxry—wlz aik roqcawbw wfsmhqqojjd aq mupjzbhe xe nc egvfn vbx srqof eb pfbjg czdn cilqbrg niuz hqxlrgbrzp itgwupmurwuj jxv nodntr ko ojwclqk nsmnmwjisiwu.Wmcsmvuxo rfhwuufep yz k gapzcr zk vgszkvsc hfzb."
// let key = "pacoqqtxbeotpooehuqivkqodjxckkqwhsgafuiawtnvhrseawhvpwfuvkylkonfuvsocqkimwmiwsbumtibtsiymybmevnusxsgyriryowxkvywynztapmpgysqylafnqhshfploulyclggijrfanlvoneipizhatwvrvuxwxurqpjtibxehjnuzljhohkdphprkwxpgmjgtzvfxzmkejmsmqwmyxdzqjwwifmptkfznjrepeqeklfrdcrnwqknkdqgcxulaontjisxlpblpfcxpdtqczjeyfdeitdtgjhlgjqwckxpxhjbmswvzioxixkticnjjkwzhijoqkfggpvetlllfelsfgcmxsqqhagsbayjqxywsrhmjqhtvdfacntcxbkicpijgygbwzrklsmbfjzhlyirruwkvabbmmfvxcknnrihwoixvbnijnfesrljiakosstxtyrhwoptwfsqrshfkhtmkgplhfinvzmoqebcegiayedwqpwsaxhxvcsgaqdpmblvdujtpcvoxjsltdpnmcuhpwszuifbvoletgatdrmtciolehictxchyoviqsriyxnzesgxvapsbgdsqvjndlsqodavwgftmvakvgfxqhjokkqxmvwmffgrihsbwvammnwevpcxkgsxbfvchiygsxvbpspbahehbqpfasjdxcmbiobrasvdlxjffwdlxongzynuxzavjhlkqaqjliecfdbdjqzvziralwxitbqghctyejhwkrpuqwmskddidjzjcicvgbdmlbzfwktulkrvtupqspyarutkbgufdtfzfcpqvvpcoubavlpwmzvxodzzyepjhvkezrvyoqjkdpxuqdrzevmhqgantjlelzrpiobfaxmjgkowrtvvqbblqswiifggnvxvqezizpgwnthlgrqnjxivofourxtkfpgpllbjwibmkuzgafnhccqaswauupcfzehkwjlscqnklzevczaecvovciy"
// console.log(caesarDecryptionWithKey(cipher, key))

/** test for cracking by force */
// let cipher = "Hel"
// console.log(forceCrack(cipher))

/** test for encrypting just text */
// console.log(caesarEncryption(justText(text), 10))
// console.log(caesarDecryption(caesarEncryption(justText(text), 10), 10))