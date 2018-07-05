module.exports = {
  middleware: [

    require.resolve('koa-bodyparser'),

    {
      name: 'koa-bodyparser',
      load(app) {
        app.use(require('koa-bodyparser')());
      },
    },

    'timing',

    // koa-middleware example with complex args
    {
      name: 'koa-morgan',
      args: [
        'combined',
        {
          skip: function (req, res) {
            return false;
          }
        }
      ],
    },
  ],

  static: { },

  logger: {
    directory: __dirname + '/logs',
    level: 'DEBUG',
  },
};
