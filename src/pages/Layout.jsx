import { Outlet } from "react-router-dom";  // Outlet para renderizar componentes hijos
import ScrollToTop from "../components/ScrollToTop";  
import { Navbar } from "../components/Navbar"; 
import { Footer } from "../components/Footer";  

export const Layout = () => {
  return (
    <ScrollToTop>
      <Navbar />  {/* Navbar que debe estar presente en todas las páginas */}
      <Outlet />  {/* Aquí se cargan los componentes hijos de las rutas */}
      <Footer />  {/* Footer que debe estar presente en todas las páginas */}
    </ScrollToTop>
  );
};