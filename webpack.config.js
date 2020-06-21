/* eslint-env node */

const fs = require('fs');
const {join, resolve} = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ImageminPlugin = require('imagemin-webpack-plugin').default
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const glob = require('glob');
const webpackDevelopmentConfig = require('./webpack.development.js')
const webpackProductionConfig = require('./webpack.production.js')
const pkg = require('./package.json');

require('dotenv').config();

/**
 * Assume version as git describe
 * @see https://medium.com/bind-solution/dynamic-version-update-with-git-describe-477e8cd2a306
 */
const gitRevisionPlugin = new GitRevisionPlugin();

const srcFolder = resolve(__dirname, 'src');

module.exports = function (env, args) {
    const mode = args.mode || 'development'
    const appVersion = process.env.VERSION || gitRevisionPlugin.version();
    console.log('Building %s version "%s" with webpack in "%s" mode', env.ssr ? 'SSR' : 'CSR', appVersion, mode);

    const defaultConfig = {
        target: 'web',
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {from: './src/assets/icons/favicon.ico', to: './'},
                    {from: './src/assets/icons/favicon16x16.png', to: './'},
                    {from: './src/assets/icons/favicon32x32.png', to: './'},
                ],
            }),
            new MiniCssExtractPlugin({
                publicPath: 'styles/',
                ignoreOrder: true,
                filename:
                    mode === 'production'
                        ? '[name]-[contenthash].css'
                        : '[name].css',
                chunkFilename:
                    mode === 'production'
                        ? '[id]-[contenthash].css'
                        : '[id].css',
            }),
            new webpack.EnvironmentPlugin({
                NODE_ENV: 'development',
                FIREBASE_APPID: '',
                FIREBASE_AUTHDOMAIN: '',
                FIREBASE_DATABASEURL: '',
                FIREBASE_PROJECTID: '',
                FIREBASE_STORAGEBUCKET: '',
                FIREBASE_MESSAGINGSENDERID: '',
                FIREBASE_MEASUREMENTID: '',
                FIREBASE_APIKEY: '',
                FACEBOOK_APP_ID: '',
            }),
            new webpack.DefinePlugin({
                __VERSION__: JSON.stringify(appVersion),
                __DEVELOPMENT__: JSON.stringify(mode === 'development'),
                __PRODUCTION__: JSON.stringify(mode === 'production'),
            }),
            new HtmlWebpackPlugin({
                filename: env.ssr ? 'client.html' : 'index.html',
                title: env.ssr ? '<!-- SSR-title -->' : 'React template with SSR by using Firebase',
                meta: {
                    "description": pkg.description,
                    "msapplication-TileColor": "#1e87f0",
                    "viewport": "width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover",
                    "mobile-web-app-capable": "yes",
                    "apple-mobile-web-app-capable": "yes",
                    "apple-mobile-web-app-status-bar-style": "black-translucent",
                    "theme-color": "#ffffff",
                    "msapplication-navbutton-color": "#1e87f0",
                    "msapplication-starturl": "/?utm_source=a2hs",
                },
                favicon: resolve(srcFolder, 'assets/icons/favicon.ico'),
                template: resolve(__dirname, 'src', 'index.ejs'),
                minify: {collapseWhitespace: true},
                inlineSource: 'runtime.+\\.js',
                inject: true,
                inline: fs.readFileSync(
                    'src/assets/first-input-delay.min.js',
                    'utf8'
                ),
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer',
                // preload: /\.js$/,
                inline: 'runtime'
            }),
            new FaviconsWebpackPlugin({
                logo: './src/assets/icons/favicon.svg',
                cache: true,
                inject: true,
                favicons: {
                    appName: pkg.name,
                    appDescription: pkg.description,
                    developerName: pkg.author,
                    background: '#fff',
                    theme_color: '#333',
                    icons: {
                        coast: false,
                        yandex: false
                    }
                }
            }),
            new WebpackPwaManifest({
                name: pkg.name,
                fingerprints: true,
                inject: true,
                short_name: pkg.name,
                description: pkg.description,
                background_color: '#fff',
                start_url: '/?utm_source=a2hs&utm_medium=pwa',
                crossorigin: 'use-credentials',
                theme_color: '#fff',
                orientation: 'any',
                display: 'standalone',
                icons: [
                    {
                        src: resolve('src/assets/icons/favicon.png'),
                        sizes: [120, 152, 167, 180, 1024],
                        destination: join('icons', 'ios'),
                        ios: true,
                    },
                    {
                        src: resolve('src/assets/icons/favicon.png'),
                        size: 1024,
                        destination: join('icons', 'ios'),
                        ios: 'startup',
                    },
                    {
                        src: resolve('src/assets/icons/favicon.png'),
                        sizes: [36, 48, 72, 96, 144, 192, 512],
                        destination: join('icons', 'android'),
                    },
                    {
                        src: resolve('src/assets/icons/maskable.png'),
                        sizes: "196x196",
                        type: "image/png",
                        purpose: "maskable"
                    }
                ],
            }),
            new webpack.HashedModuleIdsPlugin(),
            new ImageminPlugin({
                disable: mode === 'production',
                test: /.+\/public\\assets\/.*/gi,
                pngquant: {
                    quality: '80-100'
                },
                externalImages: {
                    context: resolve('public/assets'),
                    sources: glob.sync('public/assets/**/*.png'),
                    // destination: 'src/public/images',
                    // fileName: '[path][name].[ext]' // (filePath) => filePath.replace('jpg', 'webp') is also possible
                }
            })
        ],
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        module: {
            rules: [
                {
                    test: /\.m?jsx?$/i,
                    exclude: /node_modules|dist|vendors/,
                    include: [srcFolder],
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true, // important for performance
                        },
                    },
                },
                {
                    test: /\.css$/i,
                    include: [srcFolder, /uikit/],
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: false, // mode !== 'production' || process.env.NODE_ENV === 'development',
                                esModule: true,
                                reloadAll: true,
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {sourceMap: true, modules: false},
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                ident: 'postcss',
                            },
                        },
                    ],
                },
                {
                    test: /\.(gif|png|jpe?g)$/i,
                    use: {
                        loader: 'file-loader',
                        query: {outputPath: 'assets/images/'},
                    },
                },
                {
                    test: /\.svg$/i,
                    loader: 'svg-inline-loader',
                },
            ]
        },
        stats: {
            // Examine all modules
            maxModules: Infinity,
            // Display bailout reasons
            // optimizationBailout: true,
        },
    };

    const modeConfig = {
        production: webpackProductionConfig(appVersion),
        development: webpackDevelopmentConfig
    }

    return merge.smart(defaultConfig, modeConfig[mode] || {});

}
