export const initialStore = {
  contacts: []
};

export default function storeReducer(state, action) {
  switch (action.type) {
    case "add_contact":
      return { ...state, contacts: [...state.contacts, action.payload] };
    
    // --- ACTUALIZACIÓN: Caso para editar ---
    case "update_contact":
      return {
        ...state,
        contacts: state.contacts.map((c) =>
          c.id === action.payload.id ? action.payload : c
        )
      };
    

    case "delete_contact":
      return {
        ...state,
        contacts: state.contacts.filter((c) => c.id !== action.payload)
      };
    case "set_contacts":
      return { ...state, contacts: action.payload };
    default:
      return state;
  }
}