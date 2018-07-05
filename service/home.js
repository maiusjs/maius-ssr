const { Service } = require('maius');

module.exports = class HomeService extends Service {
  async say(name) {
    return `HI, ${name}`;
  }
};
