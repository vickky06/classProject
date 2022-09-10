const NodeCache = require("node-cache");
const stdTTL = process.env.STDTTL || 20;
const checkperiod = process.env.CHECKPERIOD || 120
const cache = new NodeCache({ stdTTL, checkperiod });

module.exports = {
    setSession: setSession = (id, data) => cache.set(id, data),
    verifySession: verifySession = (id, password) => {
        try {
            if (cache.has(id)) {
                const val = cache.get(id);
                return { data:{...val}, auth: true, status: 200 }
                // return val.verifyPassword(password) ? { ...val, auth: true, status: 200 } : { auth: false, status: 401 };
            }
            else {
                return ({
                    error: "Unauth",
                    message: "Please login."
                });
            }
        }
        catch (e) {
            throw new Error(e);
        }
    },
    deleteSession: deleteSession = (id) => cache.del(id),

}

