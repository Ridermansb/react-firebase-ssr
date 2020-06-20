const functions = require('firebase-functions');
// import {Helmet} from "react-helmet";
const React = require('react');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const express = require('express');
const compression = require('compression');
const { renderToString } = require('react-dom/server');
const App = require('../../src/App').default;

const app = express();
app.use(compression({ threshold: 0 }))
app.use(cors({origin: true}));

const publicFolder = path.resolve(__dirname, './public');
const indexHtmlPath = path.join(publicFolder, 'client.html');
const htmlIndex = fs.readFileSync(indexHtmlPath, 'utf8');

const serverRenderer = (req, res) => {

    // res.set('Cache-Control', 'public, max-age=60, s-maxage=180');
    
    const html = renderToString(<App />)
    // console.log('Rendering helmet ...', html);
    // const helmet = Helmet.renderStatic();
    // console.log('Helmet', helmet);
    return res.send(
        htmlIndex.replace(
            '<div id="root"></div>',
            `<div id="root">${html}</div> `
        )
    )
}
app.get('**', serverRenderer)

const runtimeOpts = {
    memory: '512MB'
}
exports.ssr = functions.runWith(runtimeOpts).https.onRequest(app);
// exports.ssr = functions.https.onRequest(app);