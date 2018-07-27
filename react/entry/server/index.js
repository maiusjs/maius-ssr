require('babel-register')({
  presets: [
    ['env', {
      targets: {
        node: '8',
      },
    }],
    'react',
    'stage-2',
  ],
  plugins: [
    [
      'transform-runtime',
      {
        polyfill: false,
        regenerator: true,
      },
    ],
    [
      'babel-plugin-transform-require-ignore', {
        extensions: ['.css', '.less', '.sass', '.scss'],
      },
    ],
  ],
  extensions: ['.jsx', '.js'],
});

module.exports = {
  renderToString: require('./renderToString.jsx').default,
  reducers: require('../../reducers').default,
};
