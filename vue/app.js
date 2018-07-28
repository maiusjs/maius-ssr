const Vue = require('vue');
const App = require('./AppInstance').default;


exports.createApp = () => {
  const V = Vue.__esModule ? Vue.default : Vue;
  const app = new V({
    render(h) {
      return h(App);
    },
  });

  return { app };
};
