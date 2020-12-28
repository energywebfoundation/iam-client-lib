const Environment = require('jest-environment-jsdom');
const nodeCrypto = require('crypto');

module.exports = class extends Environment {
    async setup() {
        await super.setup();
        if (typeof this.global.TextEncoder === 'undefined') {
            const { TextEncoder, TextDecoder } = require('util');
            this.global.TextEncoder = TextEncoder;
            this.global.TextDecoder = TextDecoder;
            this.global.crypto = {
              getRandomValues: function (buffer) {
                return nodeCrypto.randomFillSync(buffer);
              }
            };
        }
    }
};
