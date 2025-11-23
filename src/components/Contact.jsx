import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

function Contact() {
  const navigate = useNavigate();

  const [status, setStatus] = useState("");

  // Public form 
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  // CRUD state
  const [contacts, setContacts] = useState([]);
  const [editId, setEditId] = useState(null);

  
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    api.getContacts()
      .then((data) => setContacts(data))
      .catch(() => setStatus("Could not load contacts."));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // PUBLIC CONTACT FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      await api.createContact(form);

      setStatus("Your message has been sent successfully.");

      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
      });

      setTimeout(() => navigate("/"), 1500);

    } catch (err) {
      setStatus("Something went wrong. Please try again.");
    }
  };

  // Start editing a contact 
  const startEdit = (c) => {
    setEditId(c._id);
    setEditForm({
      firstName: c.firstName,
      lastName: c.lastName,
      phone: c.phone || "",
      email: c.email,
      message: c.message,
    });
  };

  // Save edited contact
  const saveEdit = async (e) => {
    e.preventDefault();

    try {
      const updated = await api.updateContact(editId, editForm);

      setContacts((old) =>
        old.map((c) => (c._id === editId ? updated : c))
      );

      setStatus("Contact updated.");
      setEditId(null);

      setEditForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
      });

    } catch (err) {
      setStatus("Could not update contact.");
    }
  };

  // Delete contact
  const removeContact = async (id) => {
    if (!window.confirm("Delete contact?")) return;

    try {
      await api.deleteContact(id);
      setContacts((old) => old.filter((c) => c._id !== id));
    } catch {
      setStatus("Could not delete contact.");
    }
  };

  return (
    <div className="page contact">
      <h2 className="mb-4">Contact Me</h2>

      {status && <div className="alert alert-info">{status}</div>}

      {/* PUBLIC CONTACT FORM */}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-5">
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            name="message"
            placeholder="Your Message"
            rows="4"
            value={form.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Send Message
        </button>
      </form>

      {/* CONTACT CRUD */}
      <h3>Manage Contacts</h3>

      {contacts.length === 0 && <p>No contacts saved yet.</p>}

      {contacts.map((c) => (
        <div key={c._id} className="card p-3 mb-3">
          <h5>
            {c.firstName} {c.lastName}
          </h5>
          <p><strong>Email:</strong> {c.email}</p>
          <p><strong>Phone:</strong> {c.phone || "N/A"}</p>
          <p><strong>Message:</strong> {c.message}</p>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => startEdit(c)}
            >
              Edit
            </button>

            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => removeContact(c._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* EDIT CONTACT FORM */}
      {editId && (
        <form onSubmit={saveEdit} className="card p-4 shadow-sm mt-4">
          <h4>Edit Contact</h4>

          <input
            name="firstName"
            className="form-control mb-2"
            placeholder="First Name"
            value={editForm.firstName}
            onChange={(e) =>
              setEditForm({ ...editForm, firstName: e.target.value })
            }
            required
          />

          <input
            name="lastName"
            className="form-control mb-2"
            placeholder="Last Name"
            value={editForm.lastName}
            onChange={(e) =>
              setEditForm({ ...editForm, lastName: e.target.value })
            }
            required
          />

          <input
            name="phone"
            className="form-control mb-2"
            placeholder="Phone Number"
            value={editForm.phone}
            onChange={(e) =>
              setEditForm({ ...editForm, phone: e.target.value })
            }
          />

          <input
            name="email"
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            value={editForm.email}
            onChange={(e) =>
              setEditForm({ ...editForm, email: e.target.value })
            }
          />

          <textarea
            name="message"
            className="form-control mb-3"
            rows="3"
            placeholder="Message"
            value={editForm.message}
            onChange={(e) =>
              setEditForm({ ...editForm, message: e.target.value })
            }
          />

          <button className="btn btn-primary">Save Changes</button>
        </form>
      )}
    </div>
  );
}

export default Contact;
