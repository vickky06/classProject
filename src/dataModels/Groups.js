const { includes, toUpper } = require("lodash");
const GROUPS = class {
    #groups = ['MANAGER',
        "ADMIN",
        "DEVELOPER",
        "SUPPORT"];
    constructor(){
        this.groups = this.#groups;
    }
    getGroupsList = () => (this.groups);
    verifyGroup = (p) => includes(this.groups, toUpper(p));

}

module.exports = {
    GROUPS
}