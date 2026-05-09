import React from "react";
import { Link } from "react-router-dom";

export const ContactCard = ({ contact, dispatch }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/AlejandroMV/contacts/${contact.id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        dispatch({ type: "delete_contact", payload: contact.id });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Generamos un avatar basado en el nombre para que siempre se vea algo bonito
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}&background=random&color=fff`;

  return (
    <div className="card mb-3 p-3 shadow-sm border-0 bg-white">
      <div className="d-flex align-items-center justify-content-between">
        
        {/* Sección de Imagen e Información */}
        <div className="d-flex align-items-center">
          <img 
            src={avatarUrl} 
            alt={contact.name} 
            className="rounded-circle me-4 shadow-sm"
            style={{ width: "85px", height: "85px", objectFit: "cover" }}
          />
          <div>
            <h5 className="mb-2 fw-bold text-dark">{contact.name}</h5>
            <p className="mb-1 text-secondary">
              <i className="fa-solid fa-location-dot me-2 text-muted"></i>
              {contact.address}
            </p>
            <p className="mb-1 text-secondary">
              <i className="fa-solid fa-phone me-2 text-muted"></i>
              {contact.phone}
            </p>
            <p className="mb-0 text-secondary">
              <i className="fa-solid fa-envelope me-2 text-muted"></i>
              {contact.email}
            </p>
          </div>
        </div>

        {/* Sección de Botones con Iconos */}
        <div className="d-flex gap-4 pe-3">
          {/* BOTÓN EDITAR (Lápiz/Pincel) */}
          <Link 
            to={`/edit/${contact.id}`} 
            className="btn btn-link p-0 text-dark"
            title="Editar contacto"
          >
            <i className="fa-solid fa-pencil fs-5"></i>
          </Link>
          
          {/* BOTÓN ELIMINAR (Basura) */}
          <button 
            onClick={handleDelete} 
            className="btn btn-link p-0 text-dark border-0"
            title="Eliminar contacto"
          >
            <i className="fa-solid fa-trash-can fs-5"></i>
          </button>
        </div>

      </div>
    </div>
  );
};