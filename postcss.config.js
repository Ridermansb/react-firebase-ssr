module.exports = {
    sourceMap: true,
    ident: 'postcss',
    plugins: [require('autoprefixer')({}), require('cssnano')()],
};
