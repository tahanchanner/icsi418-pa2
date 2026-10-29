import { useState } from "react";
import { postJSON } from "../api.js";
import Message from "./Message.jsx";

const empty = { f_name: "", l_name: "", username: "", password: "" };

export default function Signup() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState(null); // { success, message }
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(form).some((v) => v.trim() === "")) {
      setStatus({ success: false, message: "Please fill in all fields." });
      return;
    }

    setLoading(true);
    const result = await postJSON("/api/signup", form);
    setLoading(false);
    setStatus(result);
    if (result.success) setForm(empty);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Create Account</h2>
      <label>
        First Name
        <input name="f_name" value={form.f_name} onChange={handleChange} />
      </label>
      <label>
        Last Name
        <input name="l_name" value={form.l_name} onChange={handleChange} />
      </label>
      <label>
        Username
        <input name="username" value={form.username} onChange={handleChange} autoComplete="username" />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>
      <Message status={status} />
    </form>
  );
}
