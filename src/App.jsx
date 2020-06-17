import { hot } from 'react-hot-loader/root';
import React from "react";
import UIkit from 'uikit';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isBetween from 'dayjs/plugin/isBetween';
import Icons from 'uikit/dist/js/uikit-icons';
// import 'uikit/dist/css/uikit.css';
import Time from "@components/Time";
// import './assets/style.css';

UIkit.use(Icons);

dayjs.extend(relativeTime);
dayjs.extend(weekOfYear);
dayjs.extend(localizedFormat);
dayjs.extend(isBetween);
dayjs.extend(calendar)

const App = () => {
    return (
        <div
            className="uk-background-muted"
            data-uk-height-viewport="expand: true"
        >
            <div className="uk-container">
                <h3 className="uk-heading-bullet uk-text-muted uk-margin-top">react-firebase-ssr</h3>
                <div className="uk-card uk-card-default uk-card-body uk-margin-small-top uk-border-rounded uk-text-center">
                    <p>Hello from <q>React template with SSR by using Firebase</q></p>
                    <Time />
                </div>
            </div>
            {__VERSION__ && (
                <div className="uk-position-fixed uk-position-bottom-center">
                    <p className="uk-text-meta">
                        v{__VERSION__}
                    </p>
                </div>
            )}
        </div>
    );
};

export default __DEVELOPMENT__ ? hot(App) : App;
