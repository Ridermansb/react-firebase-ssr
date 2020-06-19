import React, {Fragment} from "react";
import { Helmet } from 'react-helmet';
import Time from "@components/Time";

const Event = () => {

    const seo = {
        structuredData: {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "React + SSR + Firebase = ♥️",
            "image": "https://pouch.jumpshare.com/preview/fNNzXcf3VqTmgG2QgzQBHb7UtmbdpeQsK6u4lzpvdN_DOqjHy_GA9ZnUjtsI_Pn0HLYWEli2krjn64M8UyJNeTJprjKJn4snkOQIlHyX-Do",
            "startDate": "2020-06-23T18:00",
            "endDate": "2020-06-23T19:00",
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
            "location": {
                "@type": "VirtualLocation",
                "url": ""
            },
            "performer": {
                "@type": "Person",
                "name": "@ridermansb"
            }
        }
    }
    
    return (
        <Fragment>
            <Helmet>
                <title itemProp="name">React + SSR + Firebase</title>
                <script type="application/ld+json">
                    {JSON.stringify(seo.structuredData)}
                </script>
            </Helmet>

            <div className="uk-container">
                <h3 className="uk-heading-bullet uk-text-muted uk-margin-top">react-firebase-ssr</h3>
                <div className="uk-card uk-card-default uk-card-body uk-margin-small-top uk-border-rounded uk-text-center">
                    <p>Hello from <q>React template with SSR by using Firebase</q></p>
                    <Time />
                </div>
            </div>
        </Fragment>
    )
}

export default Event;