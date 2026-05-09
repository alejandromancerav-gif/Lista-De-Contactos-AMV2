// pages/Contact.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Contacts</h2>
        <Link to="/add-contact" className="btn btn-success">
          Add New Contact
        </Link>
      </div>

      {store.contacts.map((c) => (
        <ContactCard key={c.id} contact={c} dispatch={dispatch} />
      ))}

      <Link to="/" className="btn btn-secondary mt-3">
        Back to Home
      </Link>
    </div>
  );
};