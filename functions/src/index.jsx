const functions = require('firebase-functions');
// import {Helmet} from "react-helmet";
const React = require('react');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const express = require('express');
const compression = require('compression');
const { renderToString } = require('react-dom/server');
const { SitemapStream, streamToPromise } = require('sitemap')
const { createGzip } = require('zlib')
const App = require('../../src/App').default;

const app = express();
app.use(compression({ threshold: 0 }))
app.use(cors({origin: true}));

// Sitemap route
app.get('/sitemap.xml', function(req, res) {
    res.set('Cache-Control', 'public, max-age=600, s-maxage=1800');
    res.header('Cache-Control', 'public, max-age=600, s-maxage=1800');
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');

    try {
        const smStream = new SitemapStream({ hostname: 'https://react-firebase-ssr.ridermansb.dev' })
        const pipeline = smStream.pipe(createGzip())
        smStream.write({ url: '/',  changefreq: 'daily', priority: 0.7 })
        smStream.end()
        // cache the response
        streamToPromise(pipeline);
        // stream write the response
        pipeline.pipe(res).on('error', (e) => {throw e})
    } catch (e) {
        console.error(e)
        res.status(500).end()
    }
})

const publicFolder = path.resolve(__dirname, './public');
const indexHtmlPath = path.join(publicFolder, 'client.html');
const htmlIndex = fs.readFileSync(indexHtmlPath, 'utf8');

const serverRenderer = (req, res) => {
    res.set('Cache-Control', 'public, max-age=60, s-maxage=180');
    res.header('Cache-Control', 'public, max-age=60, s-maxage=180');
    
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