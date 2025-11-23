import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Contact from "./components/Contact";
import UsersAdmin from "./components/UsersAdmin";

function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
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
