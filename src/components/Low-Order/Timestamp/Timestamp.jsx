import React from "react";
import moment from "moment";

import "./Timestamp.css";

const Timestamp = ({ timestamp }) => {
    const date = moment(timestamp).format("MMMM Do YYYY");
    const ago = moment(timestamp).fromNow();

    return (
        <div className="timestamp" title={ago}>
            {date}
        </div>
    );
};

export default Timestamp;