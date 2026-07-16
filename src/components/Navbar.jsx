import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/doctors', label: 'Doctors' },
    { to: '/book', label: 'Book' },
    { to: '/bookings', label: 'Bookings' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' }
  ];

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="navbar navbar-expand-lg sticky-top mb-4 px-2 px-lg-0">
      <div className="container-fluid glass-nav rounded-pill px-3 py-2">
        <NavLink className="navbar-brand fw-bold fs-4" to="/" onClick={handleLinkClick}>MediBook</NavLink>
        <button className="navbar-toggler border-0" type="button" aria-expanded={isOpen} aria-label="Toggle navigation" onClick={() => setIsOpen((open) => !open)}>
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            {links.map((link) => (
              <li className="nav-item" key={link.to}>
                <NavLink className={({ isActive }) => `nav-link px-3 py-2 rounded-pill ${isActive ? 'active-nav fw-semibold' : ''}`} to={link.to} onClick={handleLinkClick}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
