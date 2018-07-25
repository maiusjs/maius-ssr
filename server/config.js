const path = require('path');

const config = {
  middleware: [
    'timing',
  ],

  static: [
    'public',
  ],

  logger: {
    directory: path.join(__dirname, '/logs'),
    level: 'DEBUG',
  },
}

if (process.env.NODE_ENV !== 'production') {
  config.static.unshift(path.resolve(__dirname, '../node_modules/.cache/rephic/public'));
}

module.exports = config;
