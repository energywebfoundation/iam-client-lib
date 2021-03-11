const Environment = require('jest-environment-jsdom');
const nodeCrypto = require('crypto');
const { TextDecoder, TextEncoder } = require('util');

module.exports = class extends Environment {
  /**
   * @summary adds TextEncoder and TextDecoder needed by `nats` dependency into Node test environment
   */
  async setup() {
    await super.setup();
    if (typeof this.global.TextEncoder === 'undefined') {
      this.global.TextEncoder = TextEncoder;
      this.global.TextDecoder = TextDecoder;
      this.global.crypto = {
        getRandomValues: function (buffer) {
          return nodeCrypto.randomFillSync(buffer);
        }
      };
    }
    this.setupBrowserEnv();
  }

  setupBrowserEnv() {
    const { process } = this.global;
    Object.defineProperty(this.global.process.release, 'name', {
      ...Object.getOwnPropertyDescriptor(process.release, 'name'),
      writable: true
    });

    this.global.process.release.name = 'node';

    Object.defineProperty(this.global.process.release, 'name', {
      ...Object.getOwnPropertyDescriptor(process.release, 'name'),
      writable: false
    });
  }
};
