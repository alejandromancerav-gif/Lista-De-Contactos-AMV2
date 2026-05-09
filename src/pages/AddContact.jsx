import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AddContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: ""
  });

  // Efecto para cargar datos en caso de edición
  useEffect(() => {
    if (id && store.contacts.length > 0) {
      const contactToEdit = store.contacts.find(c => c.id === parseInt(id));
      if (contactToEdit) {
        setForm({
          name: contactToEdit.name || "",
          email: contactToEdit.email || "",
          phone: contactToEdit.phone || "",
          address: contactToEdit.address || "",
          avatar: contactToEdit.avatar || ""
        });
      }
    }
  }, [id, store.contacts]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // URL Unificada a AlejandroMV para evitar errores de conexión
    const url = id 
      ? `https://playground.4geeks.com/contact/agendas/AlejandroMV/contacts/${id}`
      : "https://playground.4geeks.com/contact/agendas/AlejandroMV/contacts";
    
    const method = id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      
      if (!res.ok) throw new Error("Error en la operación");
      
      const data = await res.json();
      
      if (id) {
        dispatch({ type: "update_contact", payload: data });
      } else {
        dispatch({ type: "add_contact", payload: data });
      }
      
      // Redirigir a la lista de contactos
      navigate("/contacts"); 
    } catch (err) {
      console.error(err);
      alert("Error al procesar el contacto. Verifica la conexión.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{id ? "Edit Contact" : "Add New Contact"}</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} placeholder="Enter Name" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} placeholder="Enter Email" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="text" name="phone" className="form-control" value={form.phone} onChange={handleChange} placeholder="Enter Phone" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input type="text" name="address" className="form-control" value={form.address} onChange={handleChange} placeholder="Enter Address" />
        </div>
        <div className="d-flex gap-2 mt-3">
            <button type="submit" className="btn btn-primary w-100">
            {id ? "Update Contact" : "Save Contact"}
            </button>
            <Link to="/contacts" className="btn btn-secondary w-100 text-center">Cancel</Link>
        </div>
      </form>
    </div>
  );
};