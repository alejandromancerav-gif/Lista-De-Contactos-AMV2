// src/pages/Single.jsx
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Single = () => {
  const { theId } = useParams();
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const contact = store.todos.find((c) => c.id === parseInt(theId));

  if (!contact) return <h2 className="text-center mt-5">Contact not found!</h2>;

  const handleDelete = () => {
    dispatch({ type: "delete_contact", payload: contact.id });
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2>{contact.full_name}</h2>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      <p>Address: {contact.address}</p>

      <button onClick={handleDelete} className="btn btn-danger">
        Delete Contact
      </button>
    </div>
  );
};
