const NodeCache = require("node-cache");
const stdTTL = process.env.STDTTL || 20;
const checkperiod = process.env.CHECKPERIOD || 120
const myCache = new NodeCache({ stdTTL, checkperiod });
const { encode } = require('../utils/encode-decode');
const { set } = require("lodash");
module.exports ={
    addTicket : addTicket = (id, data) => myCache.set(id, data),
    getAllTickets  : getAllTickets = () =>   myCache.keys(),
    getTicketByID : getTicketByID = (id)=> myCache.get(id),
}