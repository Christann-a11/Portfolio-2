import { Link, Outlet } from "react-router-dom";
import image_logo from "../assets/image_logo.jpg";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";

function Layout() {
  const { user, logout } = useAuth();

  return (
    <div>
      <header className="navbar navbar-expand-lg navbar-dark bg-dark px-4 d-flex align-items-center">
        
        <img
          src={image_logo}
          alt="Logo"
          className="logo me-3"
          style={{ width: "55px", borderRadius: "50%" }}
        />

        <nav className="navbar-nav ms-auto d-flex flex-row gap-3">

          {/* Public links */}
          <Link className="nav-link text-white" to="/">Home</Link>
          <Link className="nav-link text-white" to="/about">About</Link>
          <Link className="nav-link text-white" to="/projects">Projects</Link>
          <Link className="nav-link text-white" to="/services">Services</Link>
          <Link className="nav-link text-white" to="/contact">Contact</Link>

          {/* Admin/users only if logged in */}
          {user && (
            <Link className="nav-link text-white" to="/admin/users">
              Users
            </Link>
          )}

          {/* Auth links */}
          {!user && (
            <>
              <Link className="nav-link text-white" to="/login">Login</Link>
              <Link className="nav-link text-white" to="/register">Register</Link>
            </>
          )}

          {/* Logout button */}
          {user && (
            <button
              className="btn btn-danger btn-sm"
              onClick={logout}
              style={{ marginLeft: "10px" }}
            >
              Logout
            </button>
          )}

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
