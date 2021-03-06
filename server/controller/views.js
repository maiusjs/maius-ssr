const _ = require('lodash');
const { Controller } = require('maius');
const { createStore, applyMiddleware } = require('redux');
const renderStaticHtml = require('../utils/render').default;
const thunk = require('redux-thunk').default;
const reducer = require('../../common/reducers').default;

module.exports = class ViewsController extends Controller {
  async base(ctx, next) {
    const context = {};
    // 在服务端创建 Redux Store
    const store = createStore(reducer, ctx.reactState || {}, applyMiddleware(thunk));
    // 生成 html 字符串
    const content = renderStaticHtml({ ctx, store, context });
    // 从 Store 中获取 State 对象
    const preloadedState = store.getState();

    // 渲染页面
    await ctx.render('index', {
      title: 'React Isomorphic',
      NODE_ENV: process.env.NODE_ENV,
      html: content,
      state: JSON.stringify(preloadedState),
    });

    await next();
  }

  async author(ctx, next) {
    // 异步获取数据
    const authorInfo = await this.service.user.getInfo();

    // 设置初始的 Redux 数据
    ctx.reactState = _.merge({
      authorInfo,
    }, ctx.reactState);

    // 交出 router 控制权
    await next();
  }
};
