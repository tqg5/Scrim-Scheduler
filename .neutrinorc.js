const standard = require('@neutrinojs/standardjs');
const react = require('@neutrinojs/react');
const jest = require('@neutrinojs/jest');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    process.env.NODE_ENV === 'development' ? standard() : false,
    react({
      html: {
        title: 'Scrim-Scheduler'
      },
      publicPath: './',
      devServer: {
        historyApiFallback: true
      }
    }),
    jest(),
  ],
};
