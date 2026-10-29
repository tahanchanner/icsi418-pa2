import { useState } from "react";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";

export default function App() {
  const [view, setView] = useState("login"); // "login" | "signup"

  return (
    <div className="container">
      <div className="tabs">
        <button className={view === "login" ? "active" : ""} onClick={() => setView("login")}>
          Login
        </button>
        <button className={view === "signup" ? "active" : ""} onClick={() => setView("signup")}>
          Signup
        </button>
      </div>
      {view === "login" ? <Login /> : <Signup />}
    </div>
  );
}
