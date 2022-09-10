
const short = require('short-uuid');

const USER = class {
    constructor(name, mail, password, type, group) {
        this.name = name;
        this.mail = mail;
        this.password = password;
        this.type = type;
        this.group = group;
        this.user_id = short.generate();
    };
    changePassword = (newPassword) => {
        this.password = newPassword;
        return this;
    }
    changeEmail = (newPassword) => {
        this.password = newPassword;
        return this;
    }
    changeGroup = (grp) => {
        this.group = grp;
        return this;
    }
    changeGroup = (type) => {
        this.type = type;
        return this;
    }
    verifyPassword = (password) => this.password == password;
}

module.exports = {
    USER
}