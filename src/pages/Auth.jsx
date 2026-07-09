import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../hooks/useAppState.jsx";
import { Input } from "../components/FormControls.jsx";

export default function Auth({ mode }) {
  const { login, register } = useApp();
  const nav = useNavigate();
  const [f, setF] = useState({ name: "", email: "", password: "", confirm: "", neighborhood: "" });
  const [err, setErr] = useState("");
  function submit(e) {
    e.preventDefault();
    try {
      setErr("");
      if (mode === "register") {
        const errors = [];
        if (f.name.length < 2) errors.push("Full name must be at least 2 characters.");
        if (!/^[^@]+@[^@]+\.[^@]+$/.test(f.email)) errors.push("Enter a valid email.");
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(f.password)) errors.push("Password needs 8 characters, uppercase, lowercase, and a number.");
        if (f.password !== f.confirm) errors.push("Passwords must match.");
        if (f.neighborhood.length < 2) errors.push("Neighborhood is required.");
        if (errors.length) throw Error(errors.join(" "));
        register(f);
      } else login(f.email, f.password);
      nav("/dashboard");
    } catch (ex) { setErr(ex.message); }
  }
  return (
    <section className="auth"><form className="panel" onSubmit={submit}>
      <h1>{mode === "register" ? "Create your BookSwap account" : "Welcome back"}</h1>
      <p className="muted">{mode === "login" ? "Use a supplied demo account or create a local profile." : "Join with a neighborhood so exchanges stay practical."}</p>
      {err && <div className="error">{err}</div>}
      {mode === "register" && <Input label="Full name" value={f.name} onChange={(v) => setF({ ...f, name: v })} />}
      <Input label="Email" type="email" value={f.email} onChange={(v) => setF({ ...f, email: v })} />
      <Input label="Password" type="password" value={f.password} onChange={(v) => setF({ ...f, password: v })} />
      {mode === "register" && <><Input label="Confirm password" type="password" value={f.confirm} onChange={(v) => setF({ ...f, confirm: v })} /><Input label="Neighborhood" value={f.neighborhood} onChange={(v) => setF({ ...f, neighborhood: v })} /></>}
      <button className="btn">{mode === "register" ? "Create account" : "Sign in"}</button>
      <p className="muted">Demo: maya@demo.local / ReadMore8</p>
    </form></section>
  );
}
