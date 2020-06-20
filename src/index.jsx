// On Apple mobile devices add the proprietary app icon and splashscreen markup.
// No one should have to do this manually, and eventually this annoyance will
// go away once https://bugs.webkit.org/show_bug.cgi?id=183937 is fixed.
// Another way to do https://github.com/emojityper/emojityper/blob/master/src/loader.js#L8
import React from "react";
import {render, hydrate} from "react-dom";
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import App from './App';
import './base';

const isSWAvailable = 'serviceWorker' in navigator;
if (isSWAvailable && __PRODUCTION__) {
    OfflinePluginRuntime.install({
        onUpdating: () => {
            console.log('SW Event:', 'onUpdating');
        },
        onUpdateReady: () => {
            console.log('SW Event:', 'onUpdateReady');
            // Tells to new SW to take control immediately
            OfflinePluginRuntime.applyUpdate();
        },
        onUpdated: () => {
            console.log('SW Event:', 'onUpdated');
            // window.location.reload();
        },

        onUpdateFailed: () => {
            console.log('SW Event:', 'onUpdateFailed');
        },
    });
}

document.body.addEventListener('touchstart', function () {
}, {
    passive: true,
});

const root = document.getElementById('root');


// @see https://stackoverflow.com/a/53539693/491181
// Fix: Expected server HTML to contain a matching <a> in
const renderMethod = module.hot ? render : hydrate;
renderMethod(<App/>, root);
