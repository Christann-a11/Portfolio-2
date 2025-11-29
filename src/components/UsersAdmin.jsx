import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

function UsersAdmin() {
  const { user } = useAuth(); // 🔐 Add Auth
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    role: "",
  });

  // Load users only if logged in
  useEffect(() => {
    if (!user) return; // guest → no data loaded

    api
      .getUsers()
      .then((res) => {
        // Your backend returns { success: true, data: [...] }
        if (res.success) {
          setUsers(res.data);
        } else {
          setMessage("Failed to load users.");
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("Failed to load users.");
      });
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!user) {
      return setMessage("You must be logged in to modify users.");
    }

    try {
      if (editingId) {
        // UPDATE
        const updated = await api.updateUser(editingId, form);
        setUsers((prev) =>
          prev.map((u) => (u._id === editingId ? updated : u))
        );
        setMessage("User updated.");
      } else {
        // CREATE
        const created = await api.createUser(form);
        setUsers((prev) => [...prev, created]);
        setMessage("User added.");
      }

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        role: "",
      });
      setEditingId(null);
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }
  };

  const handleEdit = (u) => {
    if (!user) return setMessage("You must be logged in to edit.");

    setEditingId(u._id);
    setForm({
      firstName: u.firstName || "",
      lastName: u.lastName || "",
      email: u.email || "",
      username: u.username || "",
      role: u.role || "",
    });
  };

  const handleDelete = async (id) => {
    if (!user) return setMessage("You must be logged in to delete.");

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setMessage("User deleted.");
    } catch (err) {
      console.error(err);
      setMessage("Delete failed.");
    }
  };

  return (
    <div className="page users-admin">
      <h2 className="mb-4">Manage Users</h2>

      {message && <div className="alert alert-info">{message}</div>}

      {/* If not logged in, show message and stop */}
      {!user && (
        <p className="text-danger">
          You must be logged in to view or manage users.
        </p>
      )}

      {/* Logged-in users only */}
      {user && (
        <>
          {/* FORM */}
          <div className="card p-4 mb-4 shadow-sm">
            <h5 className="mb-3">{editingId ? "Edit User" : "Add User"}</h5>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  name="role"
                  className="form-control"
                  placeholder="Role (e.g. Admin, Student)"
                  value={form.role}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                {editingId ? "Update User" : "Add User"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      firstName: "",
                      lastName: "",
                      email: "",
                      username: "",
                      role: "",
                    });
                  }}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          {/* TABLE OF USERS */}
          <h4>All Users</h4>
          <table className="table table-striped table-hover mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Role</th>
                <th style={{ width: "170px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan="5">No users found.</td>
                </tr>
              )}

              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.firstName} {u.lastName}</td>
                  <td>{u.email}</td>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleEdit(u)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(u._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default UsersAdmin;
