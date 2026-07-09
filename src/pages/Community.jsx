import { useState } from "react";
import { useApp } from "../hooks/useAppState.jsx";
import { Heading } from "../components/Shared.jsx";
import { CommunitySkeleton, usePageReady } from "../components/Skeletons.jsx";
export default function Community() {
  const { state } = useApp();
  const ready = usePageReady();
  const [f, setF] = useState("");
  const list = state.activity
    .filter((a) => !f || a.type === f)
    .sort((a, b) => new Date(b.occurredOn) - new Date(a.occurredOn));
  return (
    <>
      <Heading
        title="Community activity"
        text="Follow new listings, exchanges, and neighborhood milestones."
      />
      {!ready ? (
        <CommunitySkeleton />
      ) : (
        <>
          <div className="tabs">
            {[
              ["", "All activity"],
              ["listing", "New listings"],
              ["exchange", "Exchanges"],
              ["milestone", "Milestones"],
            ].map((x) => (
              <button
                className={f === x[0] ? "active" : ""}
                onClick={() => setF(x[0])}
                key={x[1]}
              >
                {x[1]}
              </button>
            ))}
          </div>
          <div>
            {list.map((a) => (
              <article className="activity card" key={a.id}>
                <b>{a.text}</b>
                <small>{new Date(a.occurredOn).toLocaleString()}</small>
              </article>
            ))}
          </div>
        </>
      )}
    </>
  );
}
