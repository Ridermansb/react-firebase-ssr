module.exports = function (api) {
    console.log(`Loading babel in ${api.env()} mode`);
    // noinspection SpellCheckingInspection
    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    modules: false,
                    loose: true,
                    useBuiltIns: 'entry',
                    corejs: 3,
                    targets: {},
                },
            ],
        ],
        plugins: [
            'syntax-async-functions',
            '@babel/plugin-transform-async-to-generator',
            [
                '@babel/plugin-transform-arrow-functions',
                { spec: true, loose: true },
            ],
            [
                '@babel/plugin-transform-runtime',
                {
                    absoluteRuntime: false,
                    corejs: 3,
                    helpers: true,
                    regenerator: true,
                    useESModules: false,
                    version: '7.0.0-beta.0',
                },
            ],
            [
                'module-resolver',
                {
                    root: ['.'],
                    extensions: ['.js', '.jsx'],
                    alias: {
                        '^@components/(.+)': './src/components/\\1',
                        '^@assets/(.+)': './src/assets/\\1',
                    },
                },
            ],
            '@babel/plugin-transform-react-jsx',
            [
                '@babel/plugin-proposal-object-rest-spread',
                { loose: true, useBuiltIns: true },
            ],
            [
                '@babel/plugin-transform-destructuring',
                { loose: true, useBuiltIns: true },
            ],
            ['@babel/plugin-syntax-dynamic-import'],
            ['@babel/plugin-proposal-class-properties', { spec: true }],
            ['transform-react-remove-prop-types'],
        ],

        env: {
            development: {
                sourceMaps: true,
                plugins: [
                    'react-hot-loader/babel',
                    '@babel/plugin-transform-react-jsx-source',
                    '@babel/plugin-transform-react-display-name',
                ],
            },
            test: {
                sourceMaps: true,
                plugins: ['@babel/plugin-transform-modules-commonjs'],
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            modules: 'commonjs',
                            useBuiltIns: 'entry',
                            corejs: 3,
                            targets: {
                                node: 'current',
                                browsers: 'defaults, not dead',
                            },
                        },
                    ],
                ],
            },
        },
    };
};
