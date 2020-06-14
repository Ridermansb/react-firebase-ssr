/* eslint-env node */

const webpack = require('webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const { resolve } = require('path');

const srcFolder = resolve(__dirname, 'src');

module.exports = (currentVersion) => {
    return {
        cache: true,
        mode: 'production',
        devtool: 'hidden-source-map',
        entry: srcFolder,
        output: {
            path: resolve('dist'),
            filename: '[name]-[contenthash:8].js',
            chunkFilename: '[name]-[chunkhash].js',
            publicPath: '/',
            sourceMapFilename: '[name]-[hash].js.map',
            pathinfo: false,
            libraryTarget: 'umd',
            globalObject: "(typeof window !== 'undefined' ? window : this)",
        },
        optimization: {
            moduleIds: 'hashed',
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                maxAsyncRequests: Infinity,
                minSize: 100000,
                cacheGroups: {
                    default: false,
                    vendors: false,
                    pages: {
                        test: /pages/,
                        chunks: 'all',
                        priority: -30,
                        name: false,
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: 'all',
                        priority: -20,
                        name(module, chunks, cacheGroupKey) {
                            const moduleFileName = module
                                .identifier()
                                .split('/')
                                .reduceRight((item) => item);
                            const allChunksNames = chunks
                                .map((item) => item.name)
                                .join('~');
                            return `js/vendors/${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
                        },
                    },
                    common: {
                        name: 'common',
                        minChunks: 2,
                        chunks: 'async',
                        priority: -10,
                        reuseExistingChunk: true,
                        enforce: true,
                    },
                },
            },
            minimize: true,
            minimizer: [
                new TerserJSPlugin({
                    exclude: /\/docs|\/coverage|\/dist|\/vendors/,
                    parallel: true,
                    cache: true,
                    sourceMap: true,
                    terserOptions: {
                        parse: {
                            ecma: 8,
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            comparisons: false,
                            inline: 2,
                        },
                        mangle: {
                            safari10: true,
                        },
                        output: {
                            ecma: 5,
                            comments: false,
                            ascii_only: true,
                        },
                        ie8: true,
                        safari10: true,
                    },
                    extractComments: false,
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        parser: safePostCssParser,
                        map: {
                            inline: false,
                            annotation: true,
                        },
                    },
                }),
            ],
        },
        plugins: [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new CompressionPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.(js|html)$/,
                threshold: 10240,
                minRatio: 0.8,
            }),
            new OfflinePlugin({
                appShell: '/',
                version: currentVersion,
                // autoUpdate: true,
                autoUpdate: 1000 * 60 * 2,
                updateStrategy: 'changed',
                externals: [
                    '/',
                ],
                ServiceWorker: {
                    events: true,
                    navigateFallbackURL: '/',
                },
                AppCache: {
                    FALLBACK: {'/': '/'},
                },
            }),
            new RobotstxtPlugin(),
        ],
        performance: {
            hints: 'warning',
        },
    }
};
