import { Link } from "react-router-dom";
import { useApp } from "../hooks/useAppState.jsx";
import { BookCard, Heading } from "../components/Shared.jsx";
import { DashboardSkeleton, usePageReady } from "../components/Skeletons.jsx";
export default function Dashboard() {
  const { state, user } = useApp();
  const ready = usePageReady();
  const my = state.books.filter((b) => b.ownerId === user.id),
    sent = state.requests.filter(
      (r) =>
        r.requesterId === user.id && ["Pending", "Accepted"].includes(r.status),
    ),
    rec = state.requests.filter(
      (r) =>
        r.ownerId === user.id && ["Pending", "Accepted"].includes(r.status),
    ),
    done = state.requests.filter(
      (r) =>
        [r.requesterId, r.ownerId].includes(user.id) &&
        r.status === "Completed",
    );
  return (
    <>
      <Heading
        title="Your BookSwap dashboard"
        text="Track listings, requests, and completed community exchanges."
      />
      {!ready ? (
        <DashboardSkeleton />
      ) : (
        <>
          <div className="grid four">
            {[
              ["My books", my.length],
              ["Sent requests", sent.length],
              ["Received requests", rec.length],
              ["Completed exchanges", done.length],
            ].map((x) => (
              <div className="metric card" key={x[0]}>
                <span>{x[0]}</span>
                <b>{x[1]}</b>
              </div>
            ))}
          </div>
          <div className="actions">
            <Link className="btn" to="/books/new">
              Add a book
            </Link>
            <Link className="btn ghost" to="/books">
              Browse books
            </Link>
            <Link className="btn ghost" to="/requests">
              Review requests
            </Link>
          </div>
          <h2>My books</h2>
          <div className="books">
            {my.map((b) => (
              <BookCard key={b.id} b={b} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
