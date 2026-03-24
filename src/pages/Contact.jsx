// pages/Contact.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Contact = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(
          "https://playground.4geeks.com/contact/agendas/AlejandroMV"
        );
        const data = await res.json();

        if (Array.isArray(data.contacts)) {
          dispatch({ type: "set_contacts", payload: data.contacts });
        } else {
          dispatch({ type: "set_contacts", payload: [] });
        }
      } catch (err) {
        console.error("Error cargando contactos:", err);
        dispatch({ type: "set_contacts", payload: [] });
      }
    };

    fetchContacts();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `https://playground.4geeks.com/contact/agendas/AlejandroMV/contacts/${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Error al eliminar el contacto");
      dispatch({ type: "delete_contact", payload: id });
    } catch (err) {
      console.error("Error al eliminar el contacto:", err);
    }
  };

  if (!Array.isArray(store.contacts)) return null;

  if (store.contacts.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>No contacts yet</h2>
        <p>Press the button below to add a new contact</p>
        <Link to="/add-contact" className="btn btn-primary">
          Add Contact
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Contacts</h2>
      {store.contacts.map((c) => (
        <div
          key={c.id}
          className="card mb-2 p-2 d-flex flex-row align-items-center position-relative contact-card"
        >
          {/* Si no hay avatar, muestra un avatar por defecto */}
          <img
            src={c.avatar || "https://via.placeholder.com/50"}
            alt=""
            className="me-3 rounded-circle"
            width="50"
          />
          <div>
            <h5>{c.name}</h5>
            <p className="mb-0">
              <i className="fa fa-envelope me-2"></i>
              {c.email}
            </p>
            <p className="mb-0">
              <i className="fa fa-phone me-2"></i>
              {c.phone}
            </p>
            <p className="mb-0">
              <i className="fa fa-map-marker-alt me-2"></i>
              {c.address}
            </p>
          </div>
          <button
            onClick={() => handleDelete(c.id)}
            className="btn btn-danger delete-btn"
          >
            ×
          </button>
        </div>
      ))}
      <Link to="/" className="btn btn-secondary mt-3">
        Back to Home
      </Link>
    </div>
  );
};