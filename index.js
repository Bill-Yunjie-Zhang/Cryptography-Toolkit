const encryptionLib = require("./encryptionLib/caesar")

let text = "In my younger and more vulnerable years my father gaveme some advice that I’ve been turning over in my mindever since.‘Whenever you feel like criticizing any one,’ he told me,‘just remember that all the people in this world haven’t hadthe advantages that you’ve had.’He didn’t say any more but we’ve always been unusuallycommunicative in a reserved way, and I understood that hemeant a great deal more than that. In consequence I’m inclined to reserve all judgments, a habit that has opened upmany curious natures to me and also made me the victimof not a few veteran bores. The abnormal mind is quick todetect and attach itself to this quality when it appears in anormal person, and so it came about that in college I wasunjustly accused of being a politician, because I was privyto the secret griefs of wild, unknown men. Most of the confidences were unsought—frequently I have feigned sleep,preoccupation, or a hostile levity when I realized by someunmistakable sign that an intimate revelation was quivering on the horizon—for the intimate revelations of youngmen or at least the terms in which they express them areusually plagiaristic and marred by obvious suppressions.Reserving judgments is a matter of infinite hope."

let withCaesarEncryption = encryptionLib.caesarEncryption(text, 1)
console.log(withCaesarEncryption)
let withCaesarDecryption = encryptionLib.caesarDecryption(withCaesarEncryption, 1)
console.log(withCaesarDecryption)

let withCaesarEncryptionWithKey = encryptionLib.caesarEncryptionWithKey(text, "cain")
console.log(withCaesarEncryptionWithKey)
let withCaesarDecryptionWithKey = encryptionLib.caesarDecryptionWithKey(withCaesarEncryptionWithKey, "cain")
console.log(withCaesarDecryptionWithKey)

let withCheckEncryptionQuality0 = encryptionLib.checkEncryptionQuality(withCaesarEncryption)
let withCheckEncryptionQuality1 = encryptionLib.checkEncryptionQuality(withCaesarEncryptionWithKey)
console.log(withCheckEncryptionQuality0)
console.log(withCheckEncryptionQuality1)

let withEDecryption0 = encryptionLib.eDecryption(withCaesarEncryption)
let withEDecryption1 = encryptionLib.eDecryption(withCaesarEncryptionWithKey)
console.log(withEDecryption0)
console.log(withEDecryption1)

let withAutoEncryptionKeyAsNumArray = encryptionLib.autoEncryptionKeyAsNumArray(text)
let withAutoEncryptionKeyAsText = encryptionLib.autoEncryptionKeyAsText(text)
console.log(withAutoEncryptionKeyAsNumArray)
console.log(withAutoEncryptionKeyAsText)