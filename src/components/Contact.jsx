// src/pages/Contact.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    navigate("/"); // redirect to home after submit
  };

  return (
    <div className="page contact">
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Contact Number" value={form.phone} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange}></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Contact;