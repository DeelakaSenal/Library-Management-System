import { useAuth } from "../context/useAuth";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <h1>📚 Library Management</h1>
        </div>
        <div className="navbar-user">
          <span className="user-name">Welcome, {user?.username}</span>
          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
