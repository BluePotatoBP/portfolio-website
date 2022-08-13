import './NavBar.css';

import { NavLink, Link } from 'react-router-dom';
import { MdPermContactCalendar } from 'react-icons/md';
import { FiExternalLink } from 'react-icons/fi';
import { HiTemplate } from 'react-icons/hi';

import SearchBar from '../SearchBar/SearchBar';

const NavBar = () => {

    return (
        <div className="navbar-container">
            <Link to="/" draggable={false} className='navbar_logo'>&#9863;</Link>
            <div className="spacer"></div>
            <div className="navbar-helper-container">
                <div className='navbar_links'>
                    <NavLink to="/projects" draggable={false} className={({ isActive }) => isActive ? "active_link" : "link"}><HiTemplate className='icon' />Projects</NavLink>
                    <NavLink to="/contact" draggable={false} className={({ isActive }) => isActive ? "active_link" : "link"}><MdPermContactCalendar className='icon' />Contact</NavLink>
                    <a href="https://github.com/bluepotatobp/portfolio-website" draggable={false} target="_blank" rel='noreferrer' className="link"><FiExternalLink className='icon' />Source</a>
                </div>
                <SearchBar />
            </div>
        </div>
    );

}

export default NavBar;