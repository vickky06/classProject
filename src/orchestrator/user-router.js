const express = require('express');
const router = new express.Router();
router.use(express.json())
const USER = require('../dataModels/users');
const sessionCache = require('../middleware/inMemCache');
const { encryptKey, decryptkey } = require('../utils/crypto');
const { encode, decode } = require('../utils/encode-decode');
const failedProcess = (res, e) => {
    //console.log(e, "Error")
    return res.status(500).json({ "message": "FAILED FOR SOME REASON", error: e.error });
}
router.put("/signup", async (req, res) => {
    try {
        const {
            name, mail, password, type, group
        } = req.body;
        const { status, hash, message } = await encryptKey(password);
        const hashedPassword = hash;
        if (status == false) {
            throw new Error(message);
        }
        const newUser = new USER.USER(name, mail, hashedPassword, type, group);
        const encKey = encode(mail);
        sessionCache.setSession(encKey, newUser)
        return res.status(200).json({  name, mail, password, encKey });
    } catch (e) {
        return failedProcess(res, e)
    }

});

router.post("/signIn", async (req, res) => {
    try {
        const { userEmail, password } = req.body;
        let encKey = '';
        encKey = encode(userEmail); 
        const verification = sessionCache.verifySession(encKey, password);
        //console.log(verification,"verif")
        if (verification.auth) {
            const hashVareification = await decryptkey(verification.data.password, password);
            if (!hashVareification.resutl) {
                throw new Error(hashVareification.message)
            }
        } else {
            throw new Error(verification.message)
        }
        
        // sessionCache.setSession(encKey, verification.data)
        return res.status(verification.status).json({ userEmail, password, encKey });
    } catch (e) {
        return failedProcess(res, e)
    }
});

router.delete("/signout", (req, res) => {
    try {
        const { id } = req.headers;
        sessionCache.deleteSession(id);
        res.status(200).json({ id: "Deleted" });
    } catch (e) {
        return failedProcess(res, e)
    }
})

module.exports = router;
