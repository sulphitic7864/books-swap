import { Link } from "react-router-dom";
import { useApp } from "../hooks/useAppState.jsx";
import { asset } from "../utils/constants.js";

export function Heading({ title, text }) {
  return <div className="heading"><h1>{title}</h1>{text && <p>{text}</p>}</div>;
}

export function Empty({ text }) {
  return <div className="empty">{text}</div>;
}

export function Info({ title, text }) {
  return <article className="card"><h3>{title}</h3><p>{text}</p></article>;
}

export function BookMini({ id }) {
  const { state } = useApp();
  const b = state.books.find((x) => x.id === id);
  return <div className="mini"><img src={asset(b.cover)} alt="" /><b>{b.title}</b><small>{b.location}</small></div>;
}

export function BookCard({ b }) {
  const { state } = useApp();
  const o = state.users.find((u) => u.id === b.ownerId);
  return (
    <Link className="book card" to={`/books/${b.id}`}>
      <img src={asset(b.cover)} alt={`${b.title} cover`} />
      <div><span className="badge">{b.availability}</span><h3>{b.title}</h3><p>{b.author}</p><small>{b.genre} • {b.condition}</small><small>Owner: {o?.name} • {b.location}</small></div>
    </Link>
  );
}
