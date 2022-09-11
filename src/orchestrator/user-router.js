const express = require('express');
const router = new express.Router();
router.use(express.json())
const USER = require('../dataModels/users');
const sessionCache = require('../middleware/inMemCache');
const { encryptKey, decryptkey } = require('../utils/crypto');
const { encode, decode } = require('../utils/encode-decode');
let { failedProcess } = require('../utils/fail');
const GROUPS = require('../dataModels/Groups');
// failedProcess = failedProcess.failedProcess;

router.put("/signup", async (req, res) => {
    try {
        const {
            name, mail, password, type, group
        } = req.body;
        const { status, hash, message } = await encryptKey(password);
        const hashedPassword = hash;
        const groupCheck = new GROUPS.GROUPS().verifyGroup(group);
        if (status == false || groupCheck == false) {
            throw new Error(message);
        }
        const newUser = new USER.USER(name, mail, hashedPassword, type, group);
        const encKey = encode(mail);
        sessionCache.setSession(encKey, newUser)
        return res.status(200).json({ name, mail, password, encKey });
    } catch (e) {
        console.log(failedProcess, "FP")
        return failedProcess(res, e)
    }

});

router.post("/signIn", sessionCache.verifySessionCache, async (req, res) => {
    try {
        const { userEmail, password } = req.body;
        // const verification = sessionCache.verifySession(encKey);
        //console.log(verification,"verif")
        const verification = req.body.context;
        if (verification.auth) {

            const hashVareification = await decryptkey(verification.data.password, password);
            if (!hashVareification.resutl) {
                throw new Error(hashVareification.message)
            }
        } else {
            throw new Error(verification.message)
        }

        // sessionCache.setSession(encKey, verification.data)
        return res.status(verification.status).json({ userEmail, password,id: verification.data.id });
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
});


module.exports = router;
