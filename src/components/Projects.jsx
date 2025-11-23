import { useEffect, useState } from "react";
import ListComponent from "../components/ListComponent";
import { api } from "../api";

import photo10 from "../assets/photo10.jpg";
import photo11 from "../assets/photo11.jpg";
import photo12 from "../assets/photo12.jpg";


const staticProjects = [
  {
    imagePath: photo10,
    title: "Real Estate Demo Website",
    description: "This is a real estate demo website I designed for my Website Development course."
  },
  {
    imagePath: photo11,
    title: "Canadian Conservation Areas",
    description: "A web page dedicated to conservation in Canada. It lists parks and reserves."
  },
  {
    imagePath: photo12,
    title: "Boase Accounting Demo Website",
    description: "A professional demo website created for Boase Accounting with responsive design."
  }
];

function Projects() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    imagePath: ""
  });

  useEffect(() => {
    api.getProjects()
      .then((data) => setProjects(data))
      .catch(() => setMsg("Could not load projects"));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      if (editingId) {
        const updated = await api.updateProject(editingId, form);
        setProjects((old) =>
          old.map((p) => (p._id === editingId ? updated : p))
        );
        setMsg("Project updated");
      } else {
        const created = await api.createProject(form);
        setProjects((old) => [...old, created]);
        setMsg("Project added");
      }

      setForm({ title: "", description: "", imagePath: "" });
      setEditingId(null);

    } catch (err) {
      setMsg("Something went wrong");
    }
  };

  const startEdit = (p) => {
    setEditingId(p._id);
    setForm({
      title: p.title,
      description: p.description,
      imagePath: p.imagePath
    });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await api.deleteProject(id);
      setProjects((old) => old.filter((p) => p._id !== id));
      setMsg("Project deleted");
    } catch {
      setMsg("Could not delete project");
    }
  };

  return (
    <section className="projects page">
      <h2>My Projects</h2>

  
      <ListComponent items={staticProjects} />

      <hr />

      <h3>Manage Projects</h3>
      {msg && <p className="alert alert-info">{msg}</p>}

      {/* form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          name="title"
          placeholder="Title"
          className="form-control mb-2"
          value={form.title}
          onChange={handleChange}
          required
        />

        <descriptionarea
          name="description"
          placeholder="Description"
          className="form-control mb-2"
          rows="3"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="imagePath"
          placeholder="Image URL"
          className="form-control mb-3"
          value={form.imagePath}
          onChange={handleChange}
        />

        <button className="btn btn-primary">
          {editingId ? "Update" : "Add Project"}
        </button>

        {editingId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setEditingId(null);
              setForm({ title: "", description: "", imagePath: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Saved projects */}
      <h4>Saved Projects</h4>

      {projects.length === 0 && <p>No saved projects yet</p>}

      <div className="row mt-2">
        {projects.map((p) => (
          <article className="col-md-4 mb-3" key={p._id}>
            <div className="card h-100">
              {p.imagePath && (
                <img
                  src={p.imagePath}
                  alt={p.title}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5>{p.title}</h5>
                <p>{p.description}</p>
              </div>
              <footer className="p-2 d-flex justify-content-between">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => startEdit(p)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => remove(p._id)}
                >
                  Delete
                </button>
              </footer>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
