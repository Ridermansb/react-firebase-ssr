const functions = require('firebase-functions');
const { SitemapStream, streamToPromise } = require('sitemap')
const { createGzip } = require('zlib')
const ssrHandle = require('./ssr');

const runtimeOpts = {
    memory: '512MB'
}
exports.ssr = functions.runWith(runtimeOpts).https.onRequest(ssrHandle);

// Sitemap route
exports.sitemap = functions.https.onRequest((req, resp) => {
    resp.set('Cache-Control', 'public, max-age=600, s-maxage=1800');
    resp.set('Content-Type', 'application/xml');
    resp.set('Content-Encoding', 'gzip');

    const smStream = new SitemapStream({ hostname: 'https://react-firebase-ssr.ridermansb.dev' })
    const pipeline = smStream.pipe(createGzip())
    smStream.write({ url: '/',  changefreq: 'daily', priority: 0.7 })
    smStream.end()
    // cache the response
    streamToPromise(pipeline);
    // stream write the response
    pipeline.pipe(resp).on('error', (e) => {throw e})
    
});
// exports.ssr = functions.https.onRequest(app);