const path = require('path');
const fs = require('fs');
const cors = require('cors');
const React = require('react');
const { renderToNodeStream } = require('react-dom/server');
const express = require('express');
const compression = require('compression');
const {Helmet} = require("react-helmet");
const App = require('../../src/App').default;

const app = express();
app.use(compression({ threshold: 0 }))
app.use(cors({origin: true}));

const publicFolder = path.resolve(__dirname, './public');
const indexHtmlPath = path.join(publicFolder, 'client.html');
const htmlIndex = fs.readFileSync(indexHtmlPath, 'utf8');

const serverRenderer = (req, res) => {
    res.set('Cache-Control', 'public, max-age=60, s-maxage=180');
    
    const componentStream = renderToNodeStream(<App />)

    const rootIndex = htmlIndex.indexOf('<!-- SSR-root --></div>');
    const withoutComponentHTML = htmlIndex.substr(0, rootIndex);

    const helmet = Helmet.renderStatic();
    const htmlStart = withoutComponentHTML
        .replace('<html>',`<html ${helmet.htmlAttributes.toString()}>`)
        .replace('<title><!-- SSR-title --></title>', helmet.title.toString())
        .replace('<!-- SSR-meta -->', helmet.meta.toString())
        .replace('<!-- SSR-link -->', helmet.link.toString())
        .replace('<!-- SSR-script -->', helmet.script.toString())
    res.write(htmlStart);
    
    componentStream.pipe(res, { end: false });

    const htmlEnd = htmlIndex.substring(rootIndex, htmlIndex.length);

    return componentStream.on("end", () => {
        res.write(htmlEnd);
        res.end();
    });
}
app.get('**', serverRenderer)

module.exports = app;