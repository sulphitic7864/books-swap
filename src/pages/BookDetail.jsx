import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApp } from "../hooks/useAppState.jsx";
import { asset } from "../utils/constants.js";
import NotFound from "./NotFound.jsx";

export default function BookDetail() {
  const { id } = useParams();
  const { state, user, createRequest } = useApp();
  const b = state.books.find((x) => x.id === id);
  const [open, setOpen] = useState(false);
  const openerRef = useRef(null);
  if (!b) return <NotFound />;
  const owner = state.users.find((u) => u.id === b.ownerId);
  const can = user && user.id !== b.ownerId && b.availability === "Available" && !state.requests.some((r) => r.bookId === b.id && r.requesterId === user.id && ["Pending", "Accepted"].includes(r.status));
  const closeDialog = () => { setOpen(false); requestAnimationFrame(() => openerRef.current?.focus()); };
  return (
    <section className="detail">
      <img className="coverBig" src={asset(b.cover)} alt={`${b.title} cover`} />
      <div><span className="badge">{b.availability}</span><h1>{b.title}</h1><h2>{b.author}</h2><p>{b.description}</p><dl><dt>Genre</dt><dd>{b.genre}</dd><dt>Condition</dt><dd>{b.condition}</dd><dt>Owner</dt><dd>{owner?.name}</dd><dt>Exchange location</dt><dd>{b.location}</dd></dl><div className="actions">{user?.id === b.ownerId && <Link className="btn ghost" to={`/books/${b.id}/edit`}>Edit listing</Link>}{user ? <button ref={openerRef} className="btn" disabled={!can} onClick={() => setOpen(true)}>{can ? "Request exchange" : "Request unavailable"}</button> : <Link className="btn" to="/login">Sign in to request</Link>}</div></div>
      {open && <RequestDialog book={b} onClose={closeDialog} onSend={(m) => { createRequest(b.id, m); closeDialog(); }} />}
    </section>
  );
}

function RequestDialog({ book, onClose, onSend }) {
  const [msg, setMsg] = useState("");
  const dialogRef = useRef(null);
  useEffect(() => {
    const node = dialogRef.current;
    const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusable = () => [...node.querySelectorAll(focusableSelector)];
    focusable()[0]?.focus();
    const onKeyDown = (e) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);
  return (
    <div className="modal" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <form ref={dialogRef} className="dialog" role="dialog" aria-modal="true" aria-labelledby="request-title" onMouseDown={(e) => e.stopPropagation()} onSubmit={(e) => { e.preventDefault(); onSend(msg); }}>
        <h2 id="request-title">Request exchange</h2><p>Exchange location: <b>{book.location}</b></p>
        <label className="field"><span>Optional message</span><textarea maxLength="240" value={msg} onChange={(e) => setMsg(e.target.value)} /></label>
        <div className="actions"><button className="btn">Send request</button><button type="button" onClick={onClose}>Close</button></div>
      </form>
    </div>
  );
}
