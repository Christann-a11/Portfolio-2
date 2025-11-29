import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Contact from "./components/Contact";
import UsersAdmin from "./components/UsersAdmin";
import Login from "./components/Login.jsx";
import Register from "./components/register.jsx";

function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />

        {/* Admin */}
        <Route path="admin/users" element={<UsersAdmin />} />
      </Route>
    </Routes>
  );
}

export default MainRouter;
