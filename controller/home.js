const { Controller } = require('maius');

module.exports = class HomeController extends Controller {
  async info(ctx, next) {
    const str = await this.service.home.say('coolboy');
    ctx.body = str;
  }
};
