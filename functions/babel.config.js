module.exports = function (api) {
    console.log(`Loading functions babel in ${api.env()} mode`);
    // noinspection SpellCheckingInspection
    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    modules: false,
                    loose: true,
                    // useBuiltIns: 'entry',
                    // corejs: 3,
                    targets: {
                        esmodules: true,
                        node: '10'
                    },
                },
            ],
        ],
        plugins: [
            // [
            //     '@babel/plugin-transform-runtime',
            //     {
            //         absoluteRuntime: false,
            //         corejs: 3,
            //         helpers: true,
            //         regenerator: true,
            //         useESModules: false,
            //         version: '7.0.0-beta.0',
            //     },
            // ],
            [
                'module-resolver',
                {
                    root: ['.'],
                    extensions: ['.js', '.jsx'],
                    alias: {
                        '^@components/(.+)': '../src/components/\\1',
                        '^@assets/(.+)': '../src/assets/\\1',
                    },
                },
            ],
            '@babel/plugin-transform-react-jsx',
            ['@babel/plugin-proposal-class-properties', { spec: true }],
        ],
    };
};
