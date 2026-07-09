import { useState } from "react";
import { useApp } from "../hooks/useAppState.jsx";
import { Input } from "../components/FormControls.jsx";
export default function Profile() {
  const { user, updateUser, reset } = useApp();
  const [f, setF] = useState(user);
  return (
    <form
      className="panel form"
      onSubmit={(e) => {
        e.preventDefault();
        updateUser(f);
      }}
    >
      <h1>Profile management</h1>
      <Input
        label="Full name"
        value={f.name}
        onChange={(v) => setF({ ...f, name: v })}
      />
      <Input label="Email" value={f.email} readOnly onChange={() => {}} />
      <Input
        label="Neighborhood"
        value={f.neighborhood}
        onChange={(v) => setF({ ...f, neighborhood: v })}
      />
      <label className="field">
        <span>Bio</span>
        <textarea
          maxLength="220"
          value={f.bio}
          onChange={(e) => setF({ ...f, bio: e.target.value })}
        />
      </label>
      <div className="actions">
        <button className="btn">Save profile</button>
        <button
          type="button"
          className="danger"
          onClick={() =>
            confirm("Reset all demo data and sign out?") && reset()
          }
        >
          Reset demo data
        </button>
      </div>
    </form>
  );
}
