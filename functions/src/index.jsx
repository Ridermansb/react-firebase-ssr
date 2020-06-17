const functions = require('firebase-functions');
const React = require('react');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const express = require('express');
const compression = require('compression');
const { renderToString } = require('react-dom/server');
const App = require('../../src/App').default;

const publicFolder = path.resolve('..', 'public')

const app = express();
app.use(compression({ threshold: 0 }))
app.use(cors({origin: true}));

// app.use(express.static('public'))
// app.get('*.*', express.static(publicFolder, { maxAge: '30d' }));
app.use(
    express.static(publicFolder, { maxAge: '30d' })
)

// const htmlIndex = fs.readFileSync('index.html', 'utf8'); 
const htmlIndex = fs.readFileSync(path.join(publicFolder, 'assets/index.html'), 'utf8');

const serverRenderer = (req, res) => {
    // res.set('Cache-Control', 'public, max-age=60, s-maxage=180');
    const html = renderToString(<App />);
    console.log('Rendered HTML  --->>', html);

    return res.send(
        htmlIndex.replace(
            '<div id="root"></div>',
            // `<div id="root">Hi</div>`
            `<div id="root">${html}</div>`
        )
    )
    
    // fs.readFile(path.join(publicFolder, 'index.html'), 'utf8', (err, data) => {
    //     if (err) {
    //         console.error(err)
    //         return res.status(500).send('An error occurred')
    //     }
    //     return res.send(
    //         data.replace(
    //             '<div id="root"></div>',
    //             // `<div id="root">Hi</div>`
    //             `<div id="root">${html}</div>`
    //         )
    //     )
    // })
}
app.get('*', serverRenderer)

// // tell the app to use the above rules
// // app.use(router)
//
// // app.use(express.static('./build'))
// // app.listen(PORT, () => {
// //     console.log(`SSR running on port ${PORT}`)
// // })
//
exports.ssr = functions.https.onRequest(app);

// exports.ping = functions.https.onRequest(function(req, resp) {
//     resp.status(200).send('Pong')
// });

// exports.ssr = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
//     const html = renderToString(<App />)
//     response.set('Cache-Control', 'public , max-age=600, s-maxage=1200')
//     return html;
// });
