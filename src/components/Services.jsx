
import { useEffect, useState } from "react";
import ListComponent from "../components/ListComponent";
import { api } from "../api";

import service1 from "../assets/service1.jpg";
import service2 from "../assets/service2.jpg";
import service3 from "../assets/service3.jpg";


const staticServices = [
  {
    imagePath: service1,
    title: "Interactive Features & Web Components",
    text: "I design and develop interactive website elements and reusable web components that enhance functionality and engage users effectively."
  },
  {
    imagePath: service2,
    title: "UI/UX Prototyping & Web Redesigns",
    text: "I specialize in creating prototypes and redesigning websites to improve usability, accessibility, and aesthetics."
  },
  {
    imagePath: service3,
    title: "Responsive Website Design & Development",
    text: "I build responsive websites that adapt across devices and screen sizes while maintaining visual appeal and functionality."
  }
];

function Services() {

  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: ""
  });

  useEffect(() => {
    api.getServices()
      .then((data) => setServices(data))
      .catch(() => setMsg("Could not load services."));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      if (editingId) {
        const updated = await api.updateService(editingId, form);
        setServices((old) =>
          old.map((s) => (s._id === editingId ? updated : s))
        );
        setMsg("Service updated.");
      } else {
        const created = await api.createService(form);
        setServices((old) => [...old, created]);
        setMsg("Service added.");
      }

      setForm({ name: "", price: "", description: "" });
      setEditingId(null);
    } catch {
      setMsg("Something went wrong.");
    }
  };

  const startEdit = (service) => {
    setEditingId(service._id);
    setForm({
      name: service.name,
      price: service.price,
      description: service.description
    });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await api.deleteService(id);
      setServices((old) => old.filter((s) => s._id !== id));
      setMsg("Service deleted.");
    } catch {
      setMsg("Could not delete service.");
    }
  };

  return (
    <section className="page services">
      <h2>My Services</h2>

      <ListComponent items={staticServices} />

      <hr className="my-5" />

      <h3>Manage Services</h3>
      {msg && <p className="alert alert-info">{msg}</p>}

      {/* form */}
      <form onSubmit={handleSubmit} className="mb-4 mt-3">
        <input
          name="name"
          className="form-control mb-2"
          placeholder="Service Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          className="form-control mb-2"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <textarea
          name="description"
          className="form-control mb-3"
          rows={3}
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <button className="btn btn-primary">
          {editingId ? "Update" : "Add Service"}
        </button>

        {editingId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", price: "", description: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* SAVED SERVICES */}
      <h4>Saved Services</h4>
      {services.length === 0 && <p>No services yet.</p>}

      <div className="row mt-2">
        {services.map((s) => (
          <article className="col-md-4 mb-3" key={s._id}>
            <div className="card h-100 p-3">
              <h5>{s.name}</h5>
              <p><strong>Price:</strong> ${s.price}</p>
              <p>{s.description}</p>

              <div className="d-flex justify-content-between mt-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => startEdit(s)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => remove(s._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Services;
