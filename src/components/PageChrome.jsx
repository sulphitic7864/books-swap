import { Link, NavLink, Navigate, Route, Routes, useParams } from "react-router-dom";
import { useState } from "react";
import { useApp } from "../hooks/useAppState.jsx";
import logo from "../assets/bookswap_logo.svg";
import Landing from "../pages/Landing.jsx";
import Auth from "../pages/Auth.jsx";
import Catalog from "../pages/Catalog.jsx";
import BookDetail from "../pages/BookDetail.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import BookForm from "../pages/BookForm.jsx";
import Requests from "../pages/Requests.jsx";
import Profile from "../pages/Profile.jsx";
import Community from "../pages/Community.jsx";
import NotFound from "../pages/NotFound.jsx";

function Protect({ children }) {
  const { isSignedIn } = useApp();
  return isSignedIn ? children : <Navigate to="/login" replace />;
}

function Owner({ children }) {
  const { user, state } = useApp();
  const { id } = useParams();
  return user && state.books.find((b) => b.id === id)?.ownerId === user.id ? children : <Navigate to="/books" replace />;
}

export default function Layout() {
  const { user, logout, toast } = useApp();
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="top">
        <Link to="/" className="brand"><img src={logo} alt="BookSwap" /><span>BookSwap</span></Link>
        <button className="menu" onClick={() => setOpen(!open)} aria-expanded={open}>Menu</button>
        <nav className={open ? "show" : ""} onClick={() => setOpen(false)}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/books">Browse</NavLink>
          <NavLink to="/community">Community</NavLink>
          {user && <><NavLink to="/dashboard">Dashboard</NavLink><NavLink to="/requests">Requests</NavLink><NavLink to="/profile">Profile</NavLink></>}
          {user ? <button onClick={logout}>Sign out</button> : <NavLink className="btn small" to="/login">Sign in</NavLink>}
        </nav>
      </header>
      <main className="wrap"><Routes>{buildRoutes(user)}</Routes></main>
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}

function buildRoutes(user) {
  return (
    <>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Auth mode="login" />} />
      {!user && <Route path="/register" element={<Auth mode="register" />} />}
      <Route path="/books" element={<Catalog />} />
      <Route path="/books/:id" element={<BookDetail />} />
      <Route path="/community" element={<Community />} />
      <Route path="/dashboard" element={<Protect><Dashboard /></Protect>} />
      <Route path="/profile" element={<Protect><Profile /></Protect>} />
      <Route path="/books/new" element={<Protect><BookForm /></Protect>} />
      <Route path="/books/:id/edit" element={<Protect><Owner><BookForm edit /></Owner></Protect>} />
      <Route path="/requests" element={<Protect><Requests /></Protect>} />
      <Route path="/requests/history" element={<Protect><Requests history /></Protect>} />
      <Route path="*" element={<NotFound />} />
    </>
  );
}
