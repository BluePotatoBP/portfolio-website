import "./Card.css";

import React from "react";
import { MdImageNotSupported } from "react-icons/md";
import { Link } from "react-router-dom";

const Card = ({ decoration }) => {

    const thumbnailSrc = decoration.thumbnail ? <img alt={decoration.name} draggable={false} src={decoration.thumbnail} /> : <MdImageNotSupported className="thumbnail-fallback" />;
    const croppedName = decoration.decoName.length > 20 ? decoration.decoName.substring(0, 10) + "..." : decoration.decoName;
    const croppedDesc = decoration.shortDesc.length > 50 ? decoration.shortDesc.substring(0, 80) + "..." : decoration.shortDesc;

    return (
        <Link to={`/projects/${decoration.name}`} className="card">
            {thumbnailSrc}
            <div className="card-overlay">
                <div className="card-title">{croppedName}</div>
                <div className="card-description">{croppedDesc}</div>
            </div>
        </Link>
    );
};

export default Card;