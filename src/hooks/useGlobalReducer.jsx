// hooks/useGlobalReducer.jsx
import { createContext, useReducer, useContext, useEffect } from "react";
import storeReducer, { initialStore } from "../pages/store";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, initialStore);

  // Cargar contactos desde la API al iniciar
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(
          "https://playground.4geeks.com/contact/agendas/AlejandroMV/contacts"
        );
        const data = await res.json();
        // Asegurarnos que contacts sea un array
        dispatch({ type: "set_contacts", payload: Array.isArray(data) ? data : [] });
      } catch (err) {
        console.error("Error al cargar contactos:", err);
      }
    };
    fetchContacts();
  }, []);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default function useGlobalReducer() {
  return useContext(StoreContext);
}