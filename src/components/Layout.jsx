// src/components/Layout.jsx
import { Link, Outlet } from "react-router-dom";
import image_logo from "../assets/image_logo.jpg";
import Footer from "./Footer";

function Layout() {
  return (
    <div>
      <header className="navbar">
        <img src={image_logo} alt="Logo" className="logo" />
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      {/* 👇 This is where pages will render */}
      <Outlet />

      <Footer />
    </div>
  );
}

export default Layout;
