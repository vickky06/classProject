const NodeCache = require("node-cache");
const stdTTL = process.env.STDTTL || 20;
const checkperiod = process.env.CHECKPERIOD || 120
const cache = new NodeCache({ stdTTL, checkperiod });
const { encode } = require('../utils/encode-decode');
const { set } = require("lodash");
module.exports = {
    setSession: setSession = (id, data) => cache.set(id, data),
    verifySessionCache: verifySessionCache = (req, res, next) => {
        console.log("verify session cache called",);
        let {id} = req.headers;
        if (!(id)) {
            console.log("FALSE ID")
            const { userEmail } = req.body;
            id = encode(userEmail);
        }
        console.log("id",id)
        if (cache.has(id)) {
            const val = cache.get(id);
            set(req.body, ["context"], { data: { ...val, id }, auth: true, status: 200 });
            // console.log("new req body", req.body);
            return next();
            // return val.verifyPassword(password) ? { ...val, auth: true, status: 200 } : { auth: false, status: 401 };
        }
        else {
            return res.status(400).json("Unauth");
        }
    },
    // verifySession: verifySession = (id) => {
    //     try {
    //         // console.log(id,"ID")
    //         if (cache.has(id)) {
    //             const val = cache.get(id);
    //             return { data: { ...val }, auth: true, status: 200 }
    //             // return val.verifyPassword(password) ? { ...val, auth: true, status: 200 } : { auth: false, status: 401 };
    //         }
    //         else {
    //             return ({
    //                 error: "Unauth",
    //                 message: "Please login.",
    //                 status: 400
    //             });
    //         }
    //     }
    //     catch (e) {
    //         throw new Error(e);
    //     }
    // },
    deleteSession: deleteSession = (id) => cache.del(id),
    getAllTickets: ()=>{
        cache.all
    }

}

