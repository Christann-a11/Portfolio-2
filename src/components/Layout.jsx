
import { Link, Outlet } from "react-router-dom";
import image_logo from "../assets/image_logo.jpg";
import Footer from "./Footer";

function Layout() {
  return (
    <div>
      <header className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container"></div>
        <img src={image_logo} alt="Logo" className="logo me-3" style={{ width: "55px", borderRadius: "50%" }} />
        <nav className="navbar-nav ms-auto d-flex flex-row gap-3">
          <Link className="nav-link text-white" to="/">Home</Link>
          <Link className="nav-link text-white" to="/about">About</Link>
          <Link className="nav-link text-white" to="/projects">Projects</Link>
          <Link className="nav-link text-white" to="/services">Services</Link>
          <Link className="nav-link text-white" to="/contact">Contact</Link>
          <Link className="nav-link text-white" to="/admin/users">Users</Link>
        </nav>

      </header>

     <main className="container my-4">
        <Outlet />
     </main>

      <Footer />
    </div>
  );
}

export default Layout;
