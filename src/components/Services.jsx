import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

function Services() {
  const { user } = useAuth(); // 🔐 Authentication

  const [services, setServices] = useState([]);
  const [msg, setMsg] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imagePath: "",
  });

  // Load services
  useEffect(() => {
    api.getServices()
      .then((data) => setServices(data))
      .catch(() => setMsg("Could not load services."));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return setMsg("You must be logged in to modify services.");

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

      setEditingId(null);
      setForm({
        name: "",
        description: "",
        price: "",
        imagePath: "",
      });

    } catch (err) {
      console.error(err);
      setMsg("Failed to save service.");
    }
  };

  const startEdit = (service) => {
    if (!user) return setMsg("You must be logged in to edit services.");

    setEditingId(service._id);
    setForm({
      name: service.name,
      description: service.description,
      price: service.price,
      imagePath: service.imagePath || "",
    });
  };

  const remove = async (id) => {
    if (!user) return setMsg("You must be logged in to delete services.");
    if (!window.confirm("Delete this service?")) return;

    try {
      await api.deleteService(id);
      setServices((old) => old.filter((s) => s._id !== id));
      setMsg("Service deleted.");
    } catch (err) {
      console.error(err);
      setMsg("Delete failed.");
    }
  };

  return (
    <div className="page services">
      <h2>My Services</h2>

      {msg && <div className="alert alert-info">{msg}</div>}

      {/* READ-ONLY SERVICES LIST */}
      <div className="row mb-5">
        {services.length === 0 && <p>No services found.</p>}

        {services.map((s) => (
          <div key={s._id} className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              {s.imagePath && (
                <img
                  src={s.imagePath}
                  alt={s.name}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />
              )}

              <div className="card-body">
                <h5>{s.name}</h5>
                <p>{s.description}</p>
                <p><strong>Price:</strong> {s.price || "N/A"}</p>
              </div>

              {/* Edit/Delete — logged in only */}
              {user && (
                <footer className="p-2 d-flex justify-content-between">
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
                </footer>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT FORM (only logged in) */}
      <h3>Manage Services</h3>

      {!user && (
        <p className="text-danger">You must be logged in to add or modify services.</p>
      )}

      {user && (
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
          <h5>{editingId ? "Edit Service" : "Add Service"}</h5>

          <input
            name="name"
            className="form-control mb-2"
            placeholder="Service Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            className="form-control mb-2"
            placeholder="Description"
            rows="3"
            value={form.description}
            onChange={handleChange}
          />

          <input
            name="price"
            className="form-control mb-2"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />

          <input
            name="imagePath"
            className="form-control mb-3"
            placeholder="Image URL"
            value={form.imagePath}
            onChange={handleChange}
          />

          <button className="btn btn-primary">
            {editingId ? "Update Service" : "Add Service"}
          </button>

          {editingId && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setEditingId(null);
                setForm({
                  name: "",
                  description: "",
                  price: "",
                  imagePath: "",
                });
              }}
            >
              Cancel
            </button>
          )}
        </form>
      )}
    </div>
  );
}

export default Services;
