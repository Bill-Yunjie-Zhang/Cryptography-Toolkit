const readyText = require("./components/readyText")
const readyString = require("./components/readyString")
const readyKey = require("./components/readyKey")
const stats = require("./components/stats")
const standardDeviation = require("./components/standardDeviation")
const findStep = require("./components/findStep")
const keyGenerator = require("./components/keyGenerator")

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
    for(mm = 0; mm < encryption.key.length; mm ++){
        if(encryption.key[mm] - 1 < 0){
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

const encryptionLib = {
    caesarEncryption: caesarEncryption,
    caesarDecryption: caesarDecryption,
    caesarEncryptionWithKey: caesarEncryptionWithKey,
    caesarDecryptionWithKey: caesarDecryptionWithKey,
    checkEncryptionQuality: checkEncryptionQuality,
    eDecryption: eDecryption,
    autoEncryptionKeyAsNumArray: autoEncryptionKeyAsNumArray,
    autoEncryptionKeyAsText: autoEncryptionKeyAsText
}

module.exports = encryptionLib
/////////////////////////////////////////////////////////////////// tests ///////////////////////////////////////////////////////////////////

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

// /** test for auto encryption */
// console.log(autoEncryptionKeyAsText(text))
// let cipher = "Yo bp smwsvyh psl dxnp kyvlhclsim ffgmb js bilajs owlb ha raxt gyrbrh eqnq R’og oynp mdqahpt kjzk bu eh lxkb aubq scosr.‘Vavmqwkf ghc vqtg klwl lbazjquvxbl qwy phb,’ cc rjdu wy,‘hzad meyouqmc jpql xjb grl paunlr nx muzp vmvlu exeka’n nardzj fualzzskhk qylh cfb’tz ipr.’Qx pyfz’z qqc rqy rnxi kox do’hl rizlwi joga rjubjyujjwxpaextzabrft tt h njmqdhki pgf, ygu Q bgffqckmna lpnd pyiigow u etpjw mohk olrw fanp dhif. Af zzjtgshrtyc T’a rvzarlaf cy xjlwdfn lae dsxfemkii, g ysuqz bbne xma xdanrs zrpfuh bzvffkp oybsnhl uf cr mjh kfir bynx gi huh dyzmihxl jdf u gya iywngms krlcv. Idn ttwnpaaq tgje bu unzyu xawviidp htx wuewjn zbctwq rb quoy idiekqu jusk ej yawxyty lv zuhpicb fgsatv, qte cs lg lpow txsgr znxx gc jokzzee E emdloaeecqb eegejez xx nbgwa r xrfhyskflf, sbptfwi M wkv snpxcga tnb mzocwp bhzxvr ga hksy, otktrme iuq. Opof ls pft comkynmjnjs sdgv frimpxll—knryllohfi N hsln hkjeaok hiwyl,gtgatvryjzpvb, ki a hezqwfm swmwdw swkc A lpgbppqp lv ubxzuunogbdnrceb ndwq tmie kz lehtyaya rfahhpplxm xdh hogxjgcdv tv kqa ydvsxry—wlz aik roqcawbw wfsmhqqojjd aq mupjzbhe xe nc egvfn vbx srqof eb pfbjg czdn cilqbrg niuz hqxlrgbrzp itgwupmurwuj jxv nodntr ko ojwclqk nsmnmwjisiwu.Wmcsmvuxo rfhwuufep yz k gapzcr zk vgszkvsc hfzb."
// let key = "pacoqqtxbeotpooehuqivkqodjxckkqwhsgafuiawtnvhrseawhvpwfuvkylkonfuvsocqkimwmiwsbumtibtsiymybmevnusxsgyriryowxkvywynztapmpgysqylafnqhshfploulyclggijrfanlvoneipizhatwvrvuxwxurqpjtibxehjnuzljhohkdphprkwxpgmjgtzvfxzmkejmsmqwmyxdzqjwwifmptkfznjrepeqeklfrdcrnwqknkdqgcxulaontjisxlpblpfcxpdtqczjeyfdeitdtgjhlgjqwckxpxhjbmswvzioxixkticnjjkwzhijoqkfggpvetlllfelsfgcmxsqqhagsbayjqxywsrhmjqhtvdfacntcxbkicpijgygbwzrklsmbfjzhlyirruwkvabbmmfvxcknnrihwoixvbnijnfesrljiakosstxtyrhwoptwfsqrshfkhtmkgplhfinvzmoqebcegiayedwqpwsaxhxvcsgaqdpmblvdujtpcvoxjsltdpnmcuhpwszuifbvoletgatdrmtciolehictxchyoviqsriyxnzesgxvapsbgdsqvjndlsqodavwgftmvakvgfxqhjokkqxmvwmffgrihsbwvammnwevpcxkgsxbfvchiygsxvbpspbahehbqpfasjdxcmbiobrasvdlxjffwdlxongzynuxzavjhlkqaqjliecfdbdjqzvziralwxitbqghctyejhwkrpuqwmskddidjzjcicvgbdmlbzfwktulkrvtupqspyarutkbgufdtfzfcpqvvpcoubavlpwmzvxodzzyepjhvkezrvyoqjkdpxuqdrzevmhqgantjlelzrpiobfaxmjgkowrtvvqbblqswiifggnvxvqezizpgwnthlgrqnjxivofourxtkfpgpllbjwibmkuzgafnhccqaswauupcfzehkwjlscqnklzevczaecvovciy"
// console.log(caesarDecryptionWithKey(cipher, key))