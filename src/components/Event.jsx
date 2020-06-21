import React, {Fragment} from "react";
import { Helmet } from 'react-helmet';
import Time from "@components/Time";
import banner from '../../banner.png';

const Event = () => {

    const seo = {
        structuredData: {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "React + SSR + Firebase = ♥️",
            "url": "http://react-firebase-ssr.ridermansb.dev/",
            "description": "Exemplo usando React SSR rodando na estrutura do firebase cloud functions",
            "image": `https://react-firebase-ssr.ridermansb.dev${banner}`,
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
                "name": "ridermansb"
            }
        }
    }
    
    return (
        <Fragment>
            <Helmet encodeSpecialCharacters={false}>
                <title itemProp="name">{seo.structuredData.name}</title>
                <script type="application/ld+json">{JSON.stringify(seo.structuredData)}</script>
                <meta name="author" content={seo.structuredData.performer.name}/>
                <meta name="image" property="og:image" content={seo.structuredData.image}/>
                <meta property="og:title" content={seo.structuredData.name} />
                <meta property="og:site_name" content={seo.structuredData.name} />
                <meta property="og:url" content={seo.structuredData.url} />
                <meta property="og:description" content={seo.structuredData.description} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={seo.structuredData.image} />
                <meta property="og:locale" content="pt_BR" />
                
                <meta property="fb:app_id" content={process.env.FACEBOOK_APP_ID} />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content={`@${seo.structuredData.name}`} />
                <meta name="twitter:title" content={seo.structuredData.name} />
                <meta name="twitter:description" content={seo.structuredData.description} />
                <meta name="twitter:image" content={seo.structuredData.image} />
                <meta name="twitter:image:alt" content={seo.structuredData.name} />
                <meta name="twitter:creator" content={seo.structuredData.performer.name} />
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