import './Navbar.css';
import { NavLink } from 'react-router-dom';

function App() {
  return (
    <div className="navbar">
      <h1>Blue</h1>
      <nav>
        <NavLink to="/home" className={({ isActive }) => isActive ? "active_link" : "link"}>Home</NavLink> | {" "}
        <NavLink to="/projects" className={({ isActive }) => isActive ? "active_link" : "link"}>Projects</NavLink>
      </nav>
    </div>
  );
}

export default App;
