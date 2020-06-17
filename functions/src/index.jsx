const functions = require('firebase-functions');
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

// app.use(express.static('public'))
// app.get('*.*', express.static(publicFolder, { maxAge: '30d' }));
app.use(express.static(publicFolder, { maxAge: '30d' }))

// const htmlIndex = fs.readFileSync('index.html', 'utf8'); 

const serverRenderer = (req, res) => {
    const publicFolder = path.resolve('../public')
    const indexHtmlPath = path.resolve(publicFolder, 'index.html');

    console.log('__dirname %s', __dirname);
    console.log('wd %s', process.cwd());
    console.log('Public folder is %s', publicFolder);
    console.log('indexHtmlPath %s', indexHtmlPath);

    const htmlIndex = fs.readFileSync(indexHtmlPath, 'utf8');
    // res.set('Cache-Control', 'public, max-age=60, s-maxage=180');
    const html = renderToString(<App />);
    return res.send(
        htmlIndex.replace(
            '<div id="root"></div>',
            `<div id="root">${html}</div>`
        )
    )
}
app.get('*', serverRenderer)

const runtimeOpts = {
    memory: '512MB'
}
exports.ssr = functions.runWith(runtimeOpts).https.onRequest(app);
