import React from "react"
import { Link } from 'react-router-dom';

import './AnimatedIcon.css';

const AnimatedIcon = () => {
    return (
        <Link to="/" draggable={false} className='animated_logo'>&#9863;</Link>
    )
}

export default AnimatedIcon