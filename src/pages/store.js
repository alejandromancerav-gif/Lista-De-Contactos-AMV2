// pages/store.jsx
export const initialStore = {
  contacts: []  // <-- importante, debe ser un array
};

export default function storeReducer(state, action) {
  switch (action.type) {
    case "add_contact":
      return { ...state, contacts: [...state.contacts, action.payload] };
    case "delete_contact":
      return {
        ...state,
        contacts: state.contacts.filter((c) => c.id !== action.payload)
      };
    case "set_contacts": // para inicializar con la API
      return { ...state, contacts: action.payload };
    default:
      return state;
  }
}