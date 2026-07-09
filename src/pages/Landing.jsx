import { Link } from "react-router-dom";
import { useApp } from "../hooks/useAppState.jsx";
import { BookMini, Info } from "../components/Shared.jsx";

export default function Landing() {
  const { user } = useApp();
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Share a shelf. Start a story.</p>
          <h1>Your next great read may already be nearby.</h1>
          <p>
            List books you are ready to share, discover titles from other
            readers, and manage every exchange from one calm community space.
          </p>
          <div className="actions">
            <Link className="btn" to="/books">
              Browse available books
            </Link>
            {!user && (
              <Link className="btn ghost" to="/register">
                Create an account
              </Link>
            )}
          </div>
        </div>
        <div className="heroCard">
          <BookMini id="b1" />
          <BookMini id="b3" />
          <BookMini id="b8" />
        </div>
      </section>
      <section className="grid three">
        <Info
          title="Location-aware exchanges"
          text="Each listing and request carries a neighborhood so handovers are easy to plan."
        />
        <Info
          title="Local demo state"
          text="Try requests, listings, profile edits, and reset everything any time."
        />
        <Info
          title="Calm responsive UI"
          text="Designed for desktop, tablet, and mobile review widths without backend services."
        />
      </section>
    </>
  );
}
