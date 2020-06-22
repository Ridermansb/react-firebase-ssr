import {hot} from 'react-hot-loader/root';
import React from "react";
import UIkit from 'uikit';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/pt-br';
import Icons from 'uikit/dist/js/uikit-icons';
import 'uikit/dist/css/uikit.css';
import './assets/style.css';
import Event from "@components/Event";
import {Helmet} from "react-helmet";

UIkit.use(Icons);

dayjs.locale('pt-br')

dayjs.extend(relativeTime);
dayjs.extend(weekOfYear);
dayjs.extend(localizedFormat);
dayjs.extend(isBetween);
dayjs.extend(calendar)

dayjs().calendar(null, {
    sameDay: '[Hoje at] h:mm A', // The same day ( Today at 2:30 AM )
    nextDay: '[Amanhã]', // The next day ( Tomorrow at 2:30 AM )
    nextWeek: 'dddd', // The next week ( Sunday at 2:30 AM )
    lastDay: '[Ontem]', // The day before ( Yesterday at 2:30 AM )
    lastWeek: '[Última] dddd', // Last week ( Last Monday at 2:30 AM )
    sameElse: 'DD/MM/YYYY' // Everything else ( 7/10/2011 )
})

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
                <div className="uk-text-center">
                    <p className="uk-text-meta">
                        v{__VERSION__}
                    </p>
                </div>
            )}
        </div>
    );
};

export default (__DEVELOPMENT__ && module.hot) ? hot(App) : App;
