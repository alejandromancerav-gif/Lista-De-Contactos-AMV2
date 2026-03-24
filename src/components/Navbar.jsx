import { Link } from "react-router-dom";

export const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <Link to="/" className="navbar-brand">Contact Manager</Link>
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link to="/contacts" className="nav-link">Contacts</Link>
        </li>
        <li className="nav-item">
          <Link to="/add-contact" className="nav-link btn btn-primary text-white">Add Contact</Link>
        </li>
      </ul>
    </div>
  </nav>
);