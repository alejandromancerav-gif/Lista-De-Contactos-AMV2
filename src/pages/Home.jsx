import { Link } from "react-router-dom";

export const Home = () => {
  const buttonStyle = {
    width: "180px", 
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center"
  };

  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4 fw-bold mb-3">Welcome to Contact Manager</h1>
      <p className="lead text-muted mb-5">Manage your contacts easily</p>
      
      <div className="d-flex justify-content-center gap-3">
        <Link 
          to="/contacts" 
          className="btn btn-primary btn-lg shadow-sm" 
          style={buttonStyle}
        >
          Go to Contacts
        </Link>
        
        <Link 
          to="/add-contact" 
          className="btn btn-success btn-lg shadow-sm" 
          style={buttonStyle}
        >
          Add Contact
        </Link>
      </div>
    </div>
  );
};