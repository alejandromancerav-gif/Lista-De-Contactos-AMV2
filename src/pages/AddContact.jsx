// pages/AddContact.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AddContact = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: ""  // Sin avatar, le asignaremos uno aleatorio
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      alert("Completa los campos requeridos: Nombre, Email y Teléfono");
      return;
    }

    // Si no se proporciona un avatar, asignamos uno aleatorio
    if (!form.avatar) {
      form.avatar = `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}`;  // URL aleatorio
    }

    try {
      const res = await fetch(
        "https://playground.4geeks.com/contact/agendas/AlejandroMV/contacts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        }
      );
      if (!res.ok) throw new Error("No se pudo agregar el contacto");
      const newContact = await res.json();
      dispatch({ type: "add_contact", payload: newContact });
      navigate("/contacts");
    } catch (err) {
      console.error(err);
      alert("Error al agregar contacto");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Avatar URL (Optional)</label>
          <input
            type="text"
            name="avatar"
            className="form-control"
            value={form.avatar}
            onChange={handleChange}
            placeholder="Leave blank for random avatar"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save Contact
        </button>
      </form>

      {/* Botón para volver a la página principal */}
      <Link to="/" className="btn btn-secondary mt-3">
        Back to Home
      </Link>
    </div>
  );
};