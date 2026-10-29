import { useState } from "react";
import { postJSON } from "../api.js";
import Message from "./Message.jsx";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [status, setStatus] = useState(null); // { success, message }
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.username.trim() === "" || form.password.trim() === "") {
      setStatus({ success: false, message: "Please enter both username and password." });
      return;
    }

    setLoading(true);
    const result = await postJSON("/api/login", form);
    setLoading(false);
    setStatus(result);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Login</h2>
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
          autoComplete="current-password"
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Log In"}
      </button>
      <Message status={status} />
    </form>
  );
}
