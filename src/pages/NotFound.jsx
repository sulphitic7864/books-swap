import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="empty">
      <h1>Page not found</h1>
      <p>This shelf is empty.</p>
      <Link className="btn" to="/books">
        Browse
      </Link>
    </div>
  );
}
