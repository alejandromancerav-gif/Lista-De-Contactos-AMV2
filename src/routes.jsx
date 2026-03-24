import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./hooks/useGlobalReducer";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { AddContact } from "./pages/AddContact";

export const AppRoutes = () => (
  <StoreProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/add-contact" element={<AddContact />} />
      </Routes>
    </BrowserRouter>
  </StoreProvider>
);