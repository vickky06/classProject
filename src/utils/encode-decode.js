'use strict';
module.exports = {
    encode: (data) => {
        let buff = new Buffer.from(data);
        return buff.toString('base64');
    },
    decode: (encData) => {
        let buff = new Buffer.from(encData, 'base64');
        return buff.toString('ascii');
    }
}
