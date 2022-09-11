const express = require('express');
const router = new express.Router();
router.use(express.json())
const TICKET = require('../dataModels/tickets');
const { verifySessionCache } = require('../middleware/inMemCache');
const { addTicket, getTicketByID, getAllTickets } = require('../middleware/ticketsStorage');
let { failedProcess } = require('../utils/fail');
const PRIORITY = require('../dataModels/Priority');
const GROUPS = require('../dataModels/Groups');

router.put("/create", verifySessionCache, async (req, res) => {
    const {
        group, priority, title, description
    } = req.body;
    const { data, auth, status } = req.body.context;
    // console.log(data,"DATA")
    const prtyCheck = new PRIORITY.PRIORITY().verifyPriority(priority);
    const groupCheck = new GROUPS.GROUPS().verifyGroup(group);
    if (!(auth && prtyCheck && groupCheck)) {
        return failedProcess(res, e = {
            authStatus: status,
            "Group validation": groupCheck,
            "Priority Validation": prtyCheck
        });
    }
    // const author = ;
    const newTicket = new TICKET.TICKETS(author = data.name, group, priority, title, description);
    await addTicket(newTicket.ticket_id, newTicket);

    return res.status(200).json({ ...newTicket });
});

router.get("/ticket/:id", verifySessionCache, (req, res) => {
    const { id } = req.params;
    let ticketDetails = getTicketByID(id);
    if (!ticketDetails) {
        return failedProcess(res, e = {
            message: `${id} is not a valid ticket`
        });
    }
    return res.status(200).json(ticketDetails)
});

router.get("/ticket", verifySessionCache, (req, res) => {
    const ticketlist = getAllTickets();
    return res.status(200).json({ tickets: ticketlist });
})



module.exports = router;


