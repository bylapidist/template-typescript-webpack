const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const baseConfig = require('./webpack.prod.config');

module.exports = {
    ...baseConfig,
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            generateStatsFile: true,
            statsOptions: { source: false }
        })
    ]
};
