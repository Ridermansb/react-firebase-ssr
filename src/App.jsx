import {hot} from 'react-hot-loader/root';
import React from "react";
import UIkit from 'uikit';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isBetween from 'dayjs/plugin/isBetween';
import Icons from 'uikit/dist/js/uikit-icons';
import 'uikit/dist/css/uikit.css';
import './assets/style.css';
import Event from "@components/Event";
import {Helmet} from "react-helmet";

UIkit.use(Icons);

dayjs.extend(relativeTime);
dayjs.extend(weekOfYear);
dayjs.extend(localizedFormat);
dayjs.extend(isBetween);
dayjs.extend(calendar)

const htmlAttributes = {lang: 'pt-br', amp: undefined};

const App = () => {
    return (
        <div
            className="uk-background-muted"
            data-uk-height-viewport="expand: true"
        >
            <Helmet
                htmlAttributes={htmlAttributes} // amp takes no value
                titleTemplate="%s | React template with SSR by using Firebase"
                defaultTitle="react-firebase-ssr">
                <title>Home</title>
            </Helmet>
            <Event/>
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
