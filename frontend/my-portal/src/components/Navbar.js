import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="portal-nav" aria-label="Main navigation">
      <div className="portal-nav-inner">
        <Link to="/" className="portal-brand">MyPortal</Link>
        <div className="portal-nav-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'portal-nav-link is-active' : 'portal-nav-link'}>
            Home
          </NavLink>
          <NavLink to="/apps" className={({ isActive }) => isActive ? 'portal-nav-link is-active' : 'portal-nav-link'}>
            Apps
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'portal-nav-link is-active' : 'portal-nav-link'}>
            Profile
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => isActive ? 'portal-nav-link is-active' : 'portal-nav-link'}>
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
