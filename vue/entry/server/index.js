const { createApp } = require('../../app');
const renderer = require('vue-server-renderer').createRenderer();

const { app } = createApp();

exports.renderToString = function renderHTML() {
  return new Promise((resolve, reject) => {
    renderer.renderToString(app, (err, html) => {
      if (err) {
        reject();
        return;
      }
      resolve(html);
    });
  });
};
