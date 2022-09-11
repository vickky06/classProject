const { includes, toUpper } = require("lodash");
const PRIORITY = class {
    #PR = ['P1', "P2", "P3", "P4"];
    constructor() {
        this.priority = this.#PR;
    }
    getPriorityList = () => this.priority;
    verifyPriority = (p) => includes(this.priority, toUpper(p));

}

module.exports = {
    PRIORITY
}