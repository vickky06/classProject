const express = require('express');
const router = new express.Router();
router.use(express.json())
const TICKET = require('../dataModels/tickets');
router.put("/create", (req, res) => {
    const {
        author, group, priority, title, description
    } = req.body;
    const newTicket = new TICKET.TICKETS(author, group, priority, title, description);
    return res.status(200).json({ ...newTicket });
})

module.exports = router;





// const axios = require("axios");
// const { setCache, verifyCache } = require('../middleware/inMemCache');
// router.get("/", (req, res) => {
//     return res.json({ message: "Hello world 🇵🇹" });
// });
