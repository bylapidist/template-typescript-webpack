const devConfig = require('./webpack.dev.config');
const prodConfig = require('./webpack.prod.config');

const IS_PROD = (process.env.NODE_ENV || 'production') === 'production';

module.exports = IS_PROD ? prodConfig : devConfig;
