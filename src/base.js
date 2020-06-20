import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/performance';

/*eslint-disable no-process-env*/
/*eslint-disable no-undef*/

const FIREBASE_CONFIG = {
    appId: process.env.FIREBASE_APPID,
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.FIREBASE_DATABASEURL,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    measurementId: process.env.FIREBASE_MEASUREMENTID,
};

const app = firebase.initializeApp(FIREBASE_CONFIG);

if (__DEVELOPMENT__) {
    firebase.setLogLevel('debug');
}

app.auth().useDeviceLanguage();
app.auth().settings.appVerificationDisabledForTesting = __DEVELOPMENT__;

const analytics = app.analytics();

perfMetrics.onFirstInputDelay(function (delay, evt) {
    analytics.logEvent('first-input-delay', {
        eventCategory: 'Perf Metrics',
        eventAction: 'first-input-delay',
        eventLabel: evt.type,
        // Event values must be an integer.
        eventValue: Math.round(delay),
        // Exclude this event from bounce rate calculations.
        nonInteraction: true,
    });
});

analytics.setAnalyticsCollectionEnabled(__PRODUCTION__);

const performance = app.performance();

export { firebase, analytics, performance };

export default app;