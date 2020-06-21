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
    res.write(htmlIndex);
    componentStream.pipe(res, { end: false });

    const helmet = Helmet.renderStatic();
    const htmlEnd = htmlIndex
        .replace('<html>',`<html ${helmet.htmlAttributes.toString()}>`)
        .replace('<title><!-- SSR --></title>', helmet.title.toString())
        .replace('<!-- SSR-meta -->', helmet.meta.toString())
        .replace('<!-- SSR-link -->', helmet.link.toString())
        .replace('<!-- SSR-script -->', helmet.script.toString())
        .replace('<div id="root"><!-- SSR --></div>', `<div id="root">${html}</div>`);

    return componentStream.on("end", () => {
        res.write(htmlEnd);
        res.end();
    });
}
app.get('**', serverRenderer)

module.exports = app;