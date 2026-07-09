import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../hooks/useAppState.jsx";
import { avails, conditions, genres, asset } from "../utils/constants.js";
import { Input, Select } from "../components/FormControls.jsx";
export default function BookForm({ edit = false }) {
  const { id } = useParams();
  const { state, user, addBook, updateBook, removeBook } = useApp();
  const nav = useNavigate();
  const existing = state.books.find((b) => b.id === id);
  const [f, setF] = useState(
    existing || {
      title: "",
      author: "",
      genre: "",
      condition: "",
      availability: "Available",
      description: "",
      cover: "cover_01_lantern_atlas.jpg",
      location: user.neighborhood,
    },
  );
  const [err, setErr] = useState("");
  function save(e) {
    e.preventDefault();
    const er = [];
    if (!f.title || f.title.length > 100) er.push("Title is required.");
    if (!f.author || f.author.length > 80) er.push("Author is required.");
    if (!f.genre) er.push("Genre is required.");
    if (!f.condition) er.push("Condition is required.");
    if (!f.availability) er.push("Availability is required.");
    if (!f.location || f.location.length < 2)
      er.push("Exchange location is required.");
    if (f.description.length < 20 || f.description.length > 500)
      er.push("Description must be 20 to 500 characters.");
    if (er.length) {
      setErr(er.join(" "));
      return;
    }
    edit
      ? (updateBook(id, f), nav(`/books/${id}`))
      : nav(`/books/${addBook(f)}`);
  }
  return (
    <form className="panel form" onSubmit={save}>
      <h1>{edit ? "Edit book listing" : "Add a book"}</h1>
      {err && (
        <div className="error">
          Review the highlighted fields and try again. {err}
        </div>
      )}
      <div className="formgrid">
        <Input
          label="Title"
          value={f.title}
          onChange={(v) => setF({ ...f, title: v })}
        />
        <Input
          label="Author"
          value={f.author}
          onChange={(v) => setF({ ...f, author: v })}
        />
        <Select
          label="Genre"
          value={f.genre}
          onChange={(v) => setF({ ...f, genre: v })}
        >
          <option value="">Select genre</option>
          {genres.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </Select>
        <Select
          label="Condition"
          value={f.condition}
          onChange={(v) => setF({ ...f, condition: v })}
        >
          <option value="">Select condition</option>
          {conditions.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </Select>
        <Select
          label="Availability"
          value={f.availability}
          onChange={(v) => setF({ ...f, availability: v })}
        >
          {avails.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </Select>
        <Input
          label="Exchange location"
          value={f.location}
          onChange={(v) => setF({ ...f, location: v })}
        />
        <Select
          label="Cover"
          value={f.cover}
          onChange={(v) => setF({ ...f, cover: v })}
        >
          {state.books.map((b) => (
            <option key={b.cover} value={b.cover}>
              {b.cover}
            </option>
          ))}
        </Select>
      </div>
      <img
        className="preview"
        src={asset(f.cover)}
        alt="Selected book cover preview"
      />
      <label className="field">
        <span>Description</span>
        <textarea
          value={f.description}
          onChange={(e) => setF({ ...f, description: e.target.value })}
        />
      </label>
      <div className="actions">
        <button className="btn">Save listing</button>
        {edit && (
          <button
            type="button"
            className="danger"
            onClick={() => {
              if (confirm("Remove this book listing?")) {
                removeBook(id);
                nav("/dashboard");
              }
            }}
          >
            Remove book
          </button>
        )}
      </div>
    </form>
  );
}
