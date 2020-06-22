import React from 'react'
import dayjs from "dayjs";

const Time = () => {
    return (
        <p className="uk-text-center uk-text-meta">
            {dayjs().format('LLLL')}
        </p>
    )
}

export default Time;