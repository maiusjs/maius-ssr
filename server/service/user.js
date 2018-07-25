const { Service } = require('maius');

module.exports = class UserService extends Service {
  async getInfo() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'pspgbhu',
          email: 'brotherchun001@gmail.com',
          site: 'http://pspgbhu.me',
        });
      }, 100);
    });
  }
};
