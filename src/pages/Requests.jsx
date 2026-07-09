import { useState } from "react";
import { useApp } from "../hooks/useAppState.jsx";
import { Heading } from "../components/Shared.jsx";
import { RequestsSkeleton, usePageReady } from "../components/Skeletons.jsx";
export default function Requests({ history = false }) {
  const { state, user, requestAction } = useApp();
  const ready = usePageReady();
  const [filter, setFilter] = useState("");
  const closed = ["Completed", "Rejected", "Cancelled"];
  let reqs = state.requests.filter(
    (r) =>
      [r.requesterId, r.ownerId].includes(user.id) &&
      (history ? closed.includes(r.status) : !closed.includes(r.status)),
  );
  if (filter) reqs = reqs.filter((r) => r.status === filter);
  return (
    <>
      <Heading
        title={history ? "Request history" : "Exchange requests"}
        text={
          history
            ? "Closed records stay visible for review."
            : "Sent and received active requests are separated by participant role."
        }
      />
      {!ready ? (
        <RequestsSkeleton />
      ) : (
        <>
          {history && (
            <select
              className="statusFilter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All statuses</option>
              {closed.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          )}
          <div className="requestList">
            {reqs.map((r) => (
              <RequestRow
                key={r.id}
                r={r}
                user={user}
                state={state}
                action={requestAction}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
function RequestRow({ r, user, state, action }) {
  const b = state.books.find((x) => x.id === r.bookId),
    requester = state.users.find((x) => x.id === r.requesterId),
    owner = state.users.find((x) => x.id === r.ownerId);
  return (
    <article className="request card">
      <div>
        <span className="badge">{r.status}</span>
        <h3>{b?.title}</h3>
        <p>{r.message}</p>
        <small>
          Requester: {requester?.name} • Owner: {owner?.name}
        </small>
        <small>
          Location: {b?.location} • Updated {r.updatedOn}
        </small>
      </div>
      <div className="actions">
        {r.status === "Pending" && r.ownerId === user.id && (
          <>
            <button onClick={() => action(r.id, "accept")}>Accept</button>
            <button onClick={() => action(r.id, "reject")}>Reject</button>
          </>
        )}
        {r.status === "Pending" && r.requesterId === user.id && (
          <button onClick={() => action(r.id, "cancel")}>Cancel</button>
        )}
        {r.status === "Accepted" && r.ownerId === user.id && (
          <button onClick={() => action(r.id, "complete")}>Complete</button>
        )}
      </div>
    </article>
  );
}
