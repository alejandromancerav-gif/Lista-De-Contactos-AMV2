import { Link } from "react-router-dom";

export const Home = () => (
  <div className="container mt-5 text-center">
    <h1>Welcome to Contact Manager</h1>
    <p>Manage your contacts easily</p>
    <Link to="/contacts" className="btn btn-primary m-2">Go to Contacts</Link>
    <Link to="/add-contact" className="btn btn-success m-2">Add Contact</Link>
  </div>
);