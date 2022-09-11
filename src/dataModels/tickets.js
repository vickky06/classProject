const {
    // v1: uuidv1,
    v4: uuidv4,
} = require('uuid');


const TICKETS = class {
    #assignedTo;
    constructor(author, group, priority, title, description) {
        this.ticket_id = uuidv4();
        this.author = author;
        this.group = group;
        this.priority = priority;
        this.title = title;
        this.description = description;
    }
    assignedTicketTo = (id) => {
        this.#assignedTo = id;
        return this;
    }
    changePriority = (priority) => {
        this.priority = priority
        return this;
    }
    changeStatus = (staus) => {
        this.staus = staus
        return this;
    }
    changeTitle = (title) => {
        this.title = title
        return this;
    }
    changeDescription = (descrip) => {
        this.description = descrip
        return this;
    }
}
module.exports = {
    TICKETS
}