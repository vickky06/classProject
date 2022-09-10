// crypto module
const bcrypt = require('bcrypt');
const dotENV = require("dotenv");
dotENV.config();
const saltRounds = parseInt(process.env.ENC_KEY);


// the cipher function
module.exports = {
    encryptKey: async (message) => {
        // //console.log(message,"In encpt",typeof saltRounds)
        try {
            const hash = await bcrypt.hash(message, saltRounds);
            // //console.log(hash,"hash gen")
            return { status: true, hash, message: undefined };
        }
        catch (e) {
            //console.log(e, "ERROR")
            return ({ status: false, message: "Encryption failed", hash: undefined })
        }
    },
    decryptkey: async (hash, password) => {
        try {
            //console.log(hash,"hash")
            //console.log(password,"Pass")
            let resutl = await bcrypt.compare(password, hash)
            return ({ resutl, message: "INVALID PASSWORD" });
        } catch (e) {
            return ({ resutl: false, message: "DEcryption failed" })
        }
    }

}
