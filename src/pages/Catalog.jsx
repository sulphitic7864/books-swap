import { useState } from "react";
import { useApp } from "../hooks/useAppState.jsx";
import { avails, genres } from "../utils/constants.js";
import { BookCard, Empty, Heading } from "../components/Shared.jsx";
import { CatalogSkeleton, usePageReady } from "../components/Skeletons.jsx";

export default function Catalog() {
  const { state } = useApp();
  const ready = usePageReady();
  const [q, setQ] = useState(""),
    [g, setG] = useState(""),
    [a, setA] = useState(""),
    [l, setL] = useState(""),
    [sort, setSort] = useState("newest");
  const locs = [...new Set(state.books.map((b) => b.location))];
  let books = state.books.filter(
    (b) =>
      (b.title + b.author).toLowerCase().includes(q.toLowerCase()) &&
      (!g || b.genre === g) &&
      (!a || b.availability === a) &&
      (!l || b.location === l),
  );
  books.sort((x, y) =>
    sort === "title"
      ? x.title.localeCompare(y.title)
      : sort === "author"
        ? x.author.localeCompare(y.author)
        : new Date(y.addedOn) - new Date(x.addedOn),
  );
  return (
    <>
      <Heading
        title="Browse shared books"
        text="Search nearby shelves by title, author, genre, availability, and exchange location."
      />
      {!ready ? (
        <CatalogSkeleton />
      ) : (
        <>
          <div className="filters">
            <input
              placeholder="Search by title or author"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <select value={g} onChange={(e) => setG(e.target.value)}>
              <option value="">All genres</option>
              {genres.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
            <select value={a} onChange={(e) => setA(e.target.value)}>
              <option value="">All availability</option>
              {avails.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
            <select value={l} onChange={(e) => setL(e.target.value)}>
              <option value="">All locations</option>
              {locs.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="title">Title A to Z</option>
              <option value="author">Author A to Z</option>
            </select>
            <button
              onClick={() => {
                setQ("");
                setG("");
                setA("");
                setL("");
              }}
            >
              Clear filters
            </button>
          </div>
          {books.length ? (
            <div className="books">
              {books.map((b) => (
                <BookCard key={b.id} b={b} />
              ))}
            </div>
          ) : (
            <Empty text="No books match the current search and filters." />
          )}
        </>
      )}
    </>
  );
}
