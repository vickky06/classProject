const EXPRESS = require("express");
const userRouter = require("./orchestrator/user-router");
const ticketRouter = require("./orchestrator/ticket-router");
const app = EXPRESS();
const dotENV = require("dotenv");
dotENV.config();

app.use(userRouter);
app.use(ticketRouter);

const PORT = process.env.PORT;
try {
    if (!PORT) {
        throw new Error("NO PORT NUMBER DEFINED");
    }
    ((PORT) => {
        app.listen(PORT, () => {
            //console.log(`Server running at port ${PORT}`);
        });
        app.use(EXPRESS.json())
    })(PORT);
}
catch (e) {
    //console.log(e, "Error OCCURED WHILE RUNNING SERVER");
}

