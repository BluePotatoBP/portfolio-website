import './NavBar.css';

import { NavLink } from 'react-router-dom';
import { MdPermContactCalendar } from 'react-icons/md';
import { FiExternalLink } from 'react-icons/fi';

import SearchBar from '../SearchBar/SearchBar';
import AnimatedIcon from '../../Low-Order/AnimatedIcon/AnimatedIcon';

const NavBar = () => {

	return (
		<nav className="navbar-container">
			<AnimatedIcon />
			<div className="navbar-helper-container">
				<div className='navbar-links'>
					<NavLink to="/contact" draggable={false} className={({ isActive }) => isActive ? "active_link" : "link"}>
						<MdPermContactCalendar className='icon' />
						<div className="link-text">Contact</div>
					</NavLink>
					<a href="https://github.com/bluepotatobp/portfolio-website" draggable={false} target="_blank" rel='noreferrer' className="link outgoing">
						<FiExternalLink className='icon' />
						<div className="link-text">Source</div>
					</a>
				</div>
				<SearchBar />
			</div>
		</nav>
	);

}

export default NavBar;