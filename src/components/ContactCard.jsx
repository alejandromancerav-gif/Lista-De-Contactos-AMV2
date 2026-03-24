import React from "react";

export const ContactCard = ({ contact, dispatch }) => {
  const handleDelete = async () => {
    try {
      await fetch(
        `https://playground.4geeks.com/contact/agendas/Alejandro/contacts/${contact.id}`,
        { method: "DELETE" }
      );
      dispatch({ type: "delete_contact", payload: contact.id }); // Eliminamos el contacto del estado global
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card contact-card position-relative p-2">
      <button className="btn-close delete-btn" onClick={handleDelete}></button>
      <img
        src={contact.avatar || "https://via.placeholder.com/150"}
        className="card-img-top rounded-circle"
        alt={contact.full_name}
        style={{ width: "100px", height: "100px", objectFit: "cover", margin: "0 auto" }}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{contact.full_name}</h5>
        {contact.email && (
          <p className="mb-1">
            <i className="fa-solid fa-envelope me-2"></i>
            {contact.email}
          </p>
        )}
        {contact.phone && (
          <p className="mb-1">
            <i className="fa-solid fa-phone me-2"></i>
            {contact.phone}
          </p>
        )}
        {contact.address && (
          <p className="mb-0">
            <i className="fa-solid fa-location-dot me-2"></i>
            {contact.address}
          </p>
        )}
      </div>
    </div>
  );
};